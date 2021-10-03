using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ServerSendingManager : MonoBehaviour
{
    public static ServerSendingManager Instance = null;
    public const string DB_ADDRESS = "http://localhost:8000/rts/rts";

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(this);
        }
        else
        {
            Destroy(this);
        }
    }

    //Sending all necessary game data after a match
    public void SendEndGameData(string name, int score, int waves, string faction)
    {
        StartCoroutine(SendWebData(DB_ADDRESS, name, score, waves, faction));
    }

    //Send web data to sql server
    private IEnumerator SendWebData(string address, string name, int score, int waves, string faction)
    {
        //Format data for Post method and send it to server to be parsed
        WWWForm form = new WWWForm();
        form.AddField("name", name);
        form.AddField("score", score);
        form.AddField("waves", waves);
        form.AddField("faction", faction);

        UnityWebRequest webRequest = UnityWebRequest.Post(address, form);

        yield return webRequest.SendWebRequest();

        if (webRequest.isNetworkError)
        {
            Debug.Log("Some sort of error: " + webRequest.error);
        }
        else
        {
            Debug.Log("Sending data to server and database");
            Debug.Log(webRequest.downloadHandler.text);
        }
    }
}
