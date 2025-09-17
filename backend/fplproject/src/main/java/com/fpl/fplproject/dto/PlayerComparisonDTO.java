package com.fpl.fplproject.dto;

import com.fpl.fplproject.dto.FplPlayerDTO;
import com.fpl.fplproject.dto.FplTeamDTO;

public class PlayerComparisonDTO{
    private FplPlayerDTO playerA;
    private FplPlayerDTO playerB;
    public PlayerComparisonDTO(){

    }
    public PlayerComparisonDTO(FplPlayerDTO playerA,FplPlayerDTO playerB){
        this.playerA=playerA;
        this.playerB=playerB;
    }

    public FplPlayerDTO getPlayerA() {
        return playerA;
    }

    public void setPlayerA(FplPlayerDTO playerA) {
        this.playerA = playerA;
    }

    public FplPlayerDTO getPlayerB() {
        return playerB;
    }

    public void setPlayerB(FplPlayerDTO playerB) {
        this.playerB = playerB;
    }
}




