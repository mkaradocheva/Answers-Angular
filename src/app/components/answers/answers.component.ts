import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Subscription } from 'rxjs';
import { Answer } from '../shared/models/answer.model';
import { QuestionsService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})

export class AnswersComponent implements OnInit {
    questionAnswers: Answer[];
    questionAnswersSub: Subscription;
    question: string;
    roomName: string;

    constructor(private route: ActivatedRoute, 
        private questionsService: QuestionsService
        ){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.question = params['question'];
      this.roomName = params['name'];
    });

    this.questionsService.fetchAnswersForQuestion(this.question);
    // this.roomQuestionsSub =  this.roomService.questionChanged.subscribe((questions) => {
    //   this.roomQuestions = questions;
    // });
  }

  ngOnDestroy(){
    this.questionAnswersSub.unsubscribe();
    // this.roomService.cancelSubscriptions();
  }
}
