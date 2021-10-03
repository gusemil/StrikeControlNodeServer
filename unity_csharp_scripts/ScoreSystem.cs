using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScoreSystem : MonoBehaviour
{
    public static ScoreSystem Instance = null;

    private string factionChoice;
    private int totalScore = 0;
    private int waveCount = 0;
    private int totalKillsInMoney = 0;
    private int totalMoney = 0;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
    }

    public void AddTotalMoney(int money)
    {
        totalMoney += money;
    }

    public void AddUnitMoneyValue(int moneyValue)
    {
        totalKillsInMoney += moneyValue;
    }

    public void SetWaveCount(int waves)
    {
        waveCount = waves;
    }

    public int GetTotalScore()
    {
        return totalScore;
    }

    public int GetWaveCount()
    {
        return waveCount;
    }

    public string GetFaction()
    {
        return factionChoice;
    }

    public void SetFaction(int faction)
    {
        if (faction == 0)
        {
            factionChoice = "Empire";
        }
        else if (faction == 1)
        {
            factionChoice = "Union";
        }
        else
        {
            factionChoice = "Cult";
        }
    }

    public int CalculateTotalScore()
    {
        int scoreToAdd = (totalMoney / 10 + totalKillsInMoney / 10) * (waveCount + 1);
        totalScore = scoreToAdd;

        return totalScore;
    }
}
