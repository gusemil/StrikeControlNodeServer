using System.Collections;
using System.Collections.Generic;
using SimpleJSON;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class ServerGetHighScores : MonoBehaviour
{
    private ServerSendingManager serverManager;
    [SerializeField] private GameObject tableHolder;
    [SerializeField] private GameObject tablePrefab;
    private string dbAddress;

    private void OnEnable()
    {
        serverManager = ServerSendingManager.Instance;
        dbAddress = ServerSendingManager.DB_ADDRESS;
        GetTop5HighScore();
    }

    //Called when leaving the high score menu
    public void DeleteAllTables()
    {
        int tableCount = tableHolder.transform.childCount;
        List<Transform> tables = new List<Transform>();
        for (int i = 0; i < tableCount; i++)
        {
            tables.Add(tableHolder.transform.GetChild(i));
        }

        foreach (Transform table in tables)
        {
            table.SetParent(null); //Must unparent the table before destruction
            Destroy(table.gameObject);
        }
    }

    //Get the top 5 highest scores
    private void GetTop5HighScore()
    {
        StartCoroutine(GetWebData(ServerSendingManager.DB_ADDRESS));
    }

    //Get web data from sql database based on given address
    private IEnumerator GetWebData(string address)
    {

        UnityWebRequest webRequest = UnityWebRequest.Get(address);

        // wait for info to return
        yield return webRequest.SendWebRequest();

        if (webRequest.isNetworkError)
        {
            Debug.Log("Error:" + webRequest.error);
        }
        else
        {
            //Start parsing to string
            ProcessJsonStringFromServer(webRequest.downloadHandler.text);
        }
    }

    //Handle raw json string response from server
    private void ProcessJsonStringFromServer(string rawResponse)
    {
        JSONNode json = JSON.Parse(rawResponse);
        JSONNode rows = json["rows"];

        foreach (JSONNode n in rows)
        {
            Debug.Log(n);
            CreateTable(n);
        }
    }

    //Create high score table entries in high score menu
    private void CreateTable(JSONNode node)
    {
        GameObject tableInstance = Instantiate(tablePrefab, tableHolder.transform.position, Quaternion.identity);

        Text score = tableInstance.transform.Find("Score/Text").GetComponent<Text>();
        Text waves = tableInstance.transform.Find("Waves/Text").GetComponent<Text>();
        Text faction = tableInstance.transform.Find("Faction/Text").GetComponent<Text>();
        Text name = tableInstance.transform.Find("Name/Text").GetComponent<Text>();

        score.text = node["score"].ToString();
        waves.text = node["waves"].ToString();
        faction.text = node["faction"].ToString();
        name.text = node["name"].ToString();

        tableInstance.transform.SetParent(tableHolder.transform, false);
        tableInstance.transform.localScale = new Vector3(1f, 1f, 1f);
    }
}
