import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ScoreSheet } from "./scoresheet/scoreSheet";

@Injectable({
  providedIn: "root"
})
export class ScoreService {
  //* Create Observable And Publish Method
  playerScores$: BehaviorSubject<ScoreSheet> = new BehaviorSubject(
    new ScoreSheet(0, 0)
  );

  publish(score: ScoreSheet) {
    this.playerScores$.next(score);
  }

  constructor() {}
}
