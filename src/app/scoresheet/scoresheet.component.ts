import { Component, OnInit } from "@angular/core";
import { ScoreService } from "../score.service";

@Component({
  selector: "app-scoresheet",
  templateUrl: "./scoresheet.component.html",
  styleUrls: ["./scoresheet.component.scss"]
})
export class ScoresheetComponent implements OnInit {
  playerScores$ = this.scoreService.playerScores$;
  constructor(private scoreService: ScoreService) {}

  ngOnInit() {}
}
