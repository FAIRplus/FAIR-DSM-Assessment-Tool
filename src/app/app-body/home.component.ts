import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { QuestionModel } from '../interface/question-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tab1CurrentDataIndex = 0;
  tab2CurrentDataIndex = 0;
  tab3CurrentDataIndex = 0;

  answerList = new Map();

  tab1CurrentData: QuestionModel = {
    questionID: 0,
    questionCategory: 0,
    questionSerial: 0,
    question: '',
    choiceOption1: '',
    choiceOption2: '',
    choiceOption3: '',
    choiceOption4: '',
    choiceOption5: '',
    answer: 0,
  };
  tab2CurrentData: QuestionModel = {
    questionID: 0,
    questionCategory: 0,
    questionSerial: 0,
    question: '',
    choiceOption1: '',
    choiceOption2: '',
    choiceOption3: '',
    choiceOption4: '',
    choiceOption5: '',
    answer: 0,
  };
  tab3CurrentData: QuestionModel = {
    questionID: 0,
    questionCategory: 0,
    questionSerial: 0,
    question: '',
    choiceOption1: '',
    choiceOption2: '',
    choiceOption3: '',
    choiceOption4: '',
    choiceOption5: '',
    answer: 0,
  };

  tab1Data = [];
  tab2Data = [];
  tab3Data = [];

  tab1CurrentSelectedValue = null;
  tab2CurrentSelectedValue = null;
  tab3CurrentSelectedValue = null;
  

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loadTabData();
  }

  loadTabData() {
    // load all the tab data by filterin theier cateory
    this.tab1Data = this.appService.appData.filter((dt: any) => {
      return dt.questionCategory === 1;
    });

    this.tab2Data = this.appService.appData.filter((dt: any) => {
      return dt.questionCategory === 2;
    });

    this.tab3Data = this.appService.appData.filter((dt: any) => {
      return dt.questionCategory === 3;
    });
    // set first question as default data of eahc tab
    this.tab1CurrentData = this.tab1Data[0];
    this.tab2CurrentData = this.tab2Data[0];
    this.tab3CurrentData = this.tab3Data[0];
  }

  tab1disabledValue = true;


  tab1BackwardBtnClick() {
    //console.log('tab1BackwardBtnClick');
    this.tab1CurrentDataIndex = this.tab1CurrentDataIndex - 1;
    this.tab1CurrentData = this.tab1Data[this.tab1CurrentDataIndex];
    //console.log('tab1CurrentData: ', this.tab1CurrentData);
  }
  tab1ForwardBtnClick() {
    //console.log('tab1ForwardBtnClick');
    this.tab1CurrentDataIndex = this.tab1CurrentDataIndex + 1;
    this.tab1CurrentData = this.tab1Data[this.tab1CurrentDataIndex];
    //console.log('tab1CurrentData: ', this.tab1CurrentData);
  }

  tab2BackwardBtnClick() {
    //console.log('tab2BackwardBtnClick');
    this.tab2CurrentDataIndex = this.tab2CurrentDataIndex - 1;
    this.tab2CurrentData = this.tab2Data[this.tab2CurrentDataIndex];
    //console.log('tab2CurrentData: ', this.tab2CurrentData);
  }
  tab2ForwardBtnClick() {
    //console.log('tab2ForwardBtnClick');
    this.tab2CurrentDataIndex = this.tab2CurrentDataIndex + 1;
    this.tab2CurrentData = this.tab2Data[this.tab2CurrentDataIndex];
    //console.log('tab2CurrentData: ', this.tab2CurrentData);
  }

  tab3BackwardBtnClick() {
    //console.log('tab3BackwardBtnClick');
    this.tab3CurrentDataIndex = this.tab3CurrentDataIndex - 1;
    this.tab3CurrentData = this.tab3Data[this.tab3CurrentDataIndex];
    //console.log('tab3CurrentData: ', this.tab3CurrentData);
  }
  tab3ForwardBtnClick() {
    //console.log('tab3ForwardBtnClick');
    this.tab3CurrentDataIndex = this.tab3CurrentDataIndex + 1;
    this.tab3CurrentData = this.tab3Data[this.tab3CurrentDataIndex];
    //console.log('tab3CurrentData: ', this.tab3CurrentData);
  }

 
  //answerList: Array<{questionID: number, selectedAnswer: number}> = []; 
  changeRadioBtn(questionID:any,ans:any){
        this.answerList.set(questionID,ans);
        console.log(" this.answerList: ", this.answerList);
  }
}
