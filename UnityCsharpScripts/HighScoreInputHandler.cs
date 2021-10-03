using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class HighScoreInputHandler : MonoBehaviour
{
    public InputField inputField;
    [HideInInspector] public bool isInputChanged = false;
    [SerializeField] private Button submitButton;
    private ScoreSystem scoreSystem;
    private bool isSubmitButtonPressed = false;

    void Start()
    {
        scoreSystem = ScoreSystem.Instance;
    }

    public void OnSubmitPress()
    {
        if (!isSubmitButtonPressed && isInputChanged && inputField.text != "")
        {
            string name = inputField.text;
            int score = scoreSystem.GetTotalScore();
            int waves = scoreSystem.GetWaveCount();
            string faction = scoreSystem.GetFaction();
            ServerSendingManager.Instance.SendEndGameData(name, score, waves, faction);
            LockInputAndSubmit();
        }
    }

    private void LockInputAndSubmit()
    {
        isSubmitButtonPressed = true;
        inputField.interactable = false;
        Text buttonText = submitButton.transform.Find("SubmitButtonText").GetComponent<Text>();
        buttonText.text = "Submitted!";
    }
}
