using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class NameInputField : MonoBehaviour, IPointerClickHandler
{
    [SerializeField] private HighScoreInputHandler inputHandler;
    private bool isFirstEdit = true;
    public void OnPointerClick(PointerEventData eventData)
    {
        ClearTextInputField();
    }

    private void ClearTextInputField()
    {
        if (isFirstEdit)
        {
            inputHandler.inputField.text = "";
            isFirstEdit = false;
            inputHandler.isInputChanged = true;
        }
    }

}
