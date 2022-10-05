
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {
  OptionsEntity,
  QuestionModel,
  UserResponseData,
} from '../interface/question-model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tab1CurrentDataIndex = 0;
  tab2CurrentDataIndex = 0;
  tab3CurrentDataIndex = 0;

  tab1CurrentData: any = null;
  tab2CurrentData: any = null;
  tab3CurrentData: any = null;

  tab1Data: QuestionModel[] = [];
  tab2Data: QuestionModel[] = [];
  tab3Data: QuestionModel[] = [];

  baseLevelURI = "https://fairplus.github.io/Data-Maturity/docs/Levels/Level";

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.loadTabData();
  }

  loadTabData() {
    // add new properties to all questions
    this.appService.appData.map((dt: QuestionModel) => {
      dt.IsAnswered = false;
      if(dt.NoneOfAboveAllowed){
        let option= {
          "Id": 0,
          "IndicatorId": null,
          "IndicatorText": "None of the above",
          "MaturityLevel": null,
          "Category": dt.DSMCategory,
          "SubCategory": null,
          "URI": null,
          "IsSelected": false,
          "SuperIndicators": null
        }
        dt.Options?.push(option);
      }
    });
    // load all the tab data by filterin theier cateory
    this.tab1Data = this.appService.appData.filter((dt: any) => {
      return dt.DSMCategoryId === 1;
    });

    this.tab2Data = this.appService.appData.filter((dt: any) => {
      return dt.DSMCategoryId === 2;
    });

    this.tab3Data = this.appService.appData.filter((dt: any) => {
      return dt.DSMCategoryId === 3;
    });
    // set first question as default data of eahc tab
    this.tab1CurrentData = this.tab1Data[0];
    this.tab2CurrentData = this.tab2Data[0];
    this.tab3CurrentData = this.tab3Data[0];

    console.log('tab1CurrentData: ', this.tab1CurrentData);
  }

  currentSelectedTab: number = 1;
  currentTabBackwardBtnDisable: boolean = true;
  currentTabForwardBtnDisable: boolean = false;
  tabClicked(tab:number){
    console.log('tab: ', tab);
    this.currentSelectedTab = tab;

    if(this.currentSelectedTab===1) this.setCurrentBackwardForwardButton(this.tab1CurrentDataIndex,this.tab1Data);
    if(this.currentSelectedTab===2) this.setCurrentBackwardForwardButton(this.tab2CurrentDataIndex,this.tab2Data);
    if(this.currentSelectedTab===3) this.setCurrentBackwardForwardButton(this.tab3CurrentDataIndex,this.tab3Data);
  }

  setCurrentBackwardForwardButton(tabCurrentDataIndex:any,tabData:any){
    this.currentTabBackwardBtnDisable = tabCurrentDataIndex === 0 ? true: false;
    this.currentTabForwardBtnDisable = tabCurrentDataIndex === tabData.length - 1 ? true: false;
  }

  tabBackwardBtnClick() {
    if(this.currentSelectedTab===1){
    console.log('tab1BackwardBtnClick');
    this.tab1CurrentDataIndex = this.tab1CurrentDataIndex - 1;
    this.tab1CurrentData = this.tab1Data[this.tab1CurrentDataIndex];
    //console.log('tab1CurrentData: ', this.tab1CurrentData);
    this.setCurrentBackwardForwardButton(this.tab1CurrentDataIndex,this.tab1Data);
    }
    else  if(this.currentSelectedTab===2){
      console.log('tab2BackwardBtnClick');
      this.tab2CurrentDataIndex = this.tab2CurrentDataIndex - 1;
      this.tab2CurrentData = this.tab2Data[this.tab2CurrentDataIndex];
      //console.log('tab1CurrentData: ', this.tab1CurrentData);
      this.setCurrentBackwardForwardButton(this.tab2CurrentDataIndex,this.tab2Data);
    }
    else  if(this.currentSelectedTab===3){
        console.log('tab3BackwardBtnClick');
        this.tab3CurrentDataIndex = this.tab3CurrentDataIndex - 1;
        this.tab3CurrentData = this.tab3Data[this.tab3CurrentDataIndex];
        //console.log('tab1CurrentData: ', this.tab1CurrentData);
        this.setCurrentBackwardForwardButton(this.tab3CurrentDataIndex,this.tab3Data);
    }

  }

  tabForwardBtnClick() {
    if(this.currentSelectedTab===1){
      console.log('tab1ForwardBtnClick');
      this.tab1CurrentDataIndex = this.tab1CurrentDataIndex + 1;
      this.tab1CurrentData = this.tab1Data[this.tab1CurrentDataIndex];
      //console.log('tab1CurrentData: ', this.tab1CurrentData);
      this.setCurrentBackwardForwardButton(this.tab1CurrentDataIndex,this.tab1Data);
    }
    else if(this.currentSelectedTab===2){
      console.log('tab2ForwardBtnClick');
      this.tab2CurrentDataIndex = this.tab2CurrentDataIndex + 1;
      this.tab2CurrentData = this.tab2Data[this.tab2CurrentDataIndex];
      //console.log('tab1CurrentData: ', this.tab1CurrentData);
      this.setCurrentBackwardForwardButton(this.tab2CurrentDataIndex,this.tab2Data);
    }
    else if(this.currentSelectedTab===3){
      console.log('tab3ForwardBtnClick');
      this.tab3CurrentDataIndex = this.tab3CurrentDataIndex + 1;
      this.tab3CurrentData = this.tab3Data[this.tab3CurrentDataIndex];
      //console.log('tab1CurrentData: ', this.tab1CurrentData);
      this.setCurrentBackwardForwardButton(this.tab3CurrentDataIndex,this.tab3Data);
    }
  }


  userResponseData: UserResponseData[] = [];

  checkLevel(value: any) {
    let level = []
    if (value.includes('Level 0')) level.push(0);
    if (value.includes('Level 1')) level.push(1);
    if (value.includes('Level 2')) level.push(2);
    if (value.includes('Level 3')) level.push(3);
    if (value.includes('Level 4')) level.push(4);
    if (value.includes('Level 5')) level.push(5);
    return level;
  }

  allAnsweredQ: any[] = [];
  submitResponse() {
    let answeredQuestion = this.appService.appData.filter(
      (dt: QuestionModel) => {
        return dt.IsAnswered === true;
      }
    );
    if ( answeredQuestion &&answeredQuestion.length === this.appService.appData.length)
    {
      this.isVisible = true;

    }
    else alert("Please answer all the questions!!");
    //this.isVisible = true;

    this.userResponseData =[];

    // get all answered question by representation category
    let allAnsweredLevels = [];

    let allQuestions = this.appService.appData;

    for (let i = 0; i < allQuestions.length; i++) {
      // loop through each question
        for (let j = 0;j < allQuestions[i].Options?.length;j++ ) {
          // loop through each option
            const mValues = allQuestions[i].Options[j].MaturityLevel;
            if(mValues){
              const connectedLevels = this.checkLevel(mValues)
              //  loop through each connected level
              for(let k=0;k<connectedLevels.length;k++){
                // store each connected level for each option for each question;
                  allAnsweredLevels.push({
                    DSMCategoryId: allQuestions[i].DSMCategoryId,
                    level: connectedLevels[k],
                    isSelected: allQuestions[i].Options[j].IsSelected ||
                      this.checkSuperseded(allQuestions[i].Options,allQuestions[i].Options[j].SuperIndicators)
                  });
              }
            }

        }
    }


    this.allAnsweredQ = allAnsweredLevels;
    // representaion
    let count_L_0_R_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===0
    }).length;
    let count_L_0_R_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===0 && x.isSelected===false
    }).length;

    let count_L_1_R_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===1
    }).length;
    let count_L_1_R_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===1 && x.isSelected===true
    }).length;

    let count_L_2_R_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===2
    }).length;
    let count_L_2_R_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===2 && x.isSelected===true
    }).length;

    let count_L_3_R_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===3
    }).length;
    let count_L_3_R_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===3 && x.isSelected===true
    }).length;

    let count_L_4_R_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===4
    }).length;
    let count_L_4_R_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===4 && x.isSelected===true
    }).length;

    let count_L_5_R_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===5
    }).length;
    let count_L_5_R_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===1 && x.level===5 && x.isSelected===true
    }).length;

    // Content
    let count_L_0_C_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===0
    }).length;
    let count_L_0_C_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===0 && x.isSelected===false
    }).length;

    let count_L_1_C_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===1
    }).length;
    let count_L_1_C_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===1 && x.isSelected===true
    }).length;

    let count_L_2_C_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===2
    }).length;
    let count_L_2_C_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===2 && x.isSelected===true
    }).length;

    let count_L_3_C_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===3
    }).length;
    let count_L_3_C_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===3 && x.isSelected===true
    }).length;

    let count_L_4_C_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===4
    }).length;
    let count_L_4_C_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===4 && x.isSelected===true
    }).length;

    let count_L_5_C_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===5
    }).length;
    let count_L_5_C_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===2 && x.level===5 && x.isSelected===true
    }).length;
    // hosting
    let count_L_0_H_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===0
    }).length;
    let count_L_0_H_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===0 && x.isSelected===false
    }).length;

    let count_L_1_H_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===1
    }).length;
    let count_L_1_H_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===1 && x.isSelected===true
    }).length;

    let count_L_2_H_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===2
    }).length;
    let count_L_2_H_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===2 && x.isSelected===true
    }).length;

    let count_L_3_H_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===3
    }).length;
    let count_L_3_H_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===3 && x.isSelected===true
    }).length;

    let count_L_4_H_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===4
    }).length;
    let count_L_4_H_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===4 && x.isSelected===true
    }).length;

    let count_L_5_H_total = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===5
    }).length;
    let count_L_5_H_selected = allAnsweredLevels.filter((x:any)=>{
      return x.DSMCategoryId===3 && x.level===5 && x.isSelected===true
    }).length;



    // this.userResponseData.push({
    //   Level: 'Level 0',
    //   PresentationScore:  this.calculationResult(count_L_0_R_selected,count_L_0_R_total),
    //   ContentScore: this.calculationResult(count_L_0_C_selected,count_L_0_C_total),
    //   Hosting: this.calculationResult(count_L_0_H_selected,count_L_0_H_total),
    //   TotalScoreByLevel: this.calculationResult((count_L_0_R_selected+count_L_0_C_selected+count_L_0_H_selected),(count_L_0_R_total+count_L_0_C_total+count_L_0_H_total)),
    // });

    this.userResponseData.push({
      Level: 'Level 1',
      URI:this.baseLevelURI+1,
      PresentationScore: this.calculationResult(count_L_1_R_selected,count_L_1_R_total),
      ContentScore: this.calculationResult(count_L_1_C_selected,count_L_1_C_total),
      Hosting: this.calculationResult(count_L_1_H_selected,count_L_1_H_total),
      TotalScoreByLevel: this.calculationResult((count_L_1_R_selected+count_L_1_C_selected+count_L_1_H_selected),(count_L_1_R_total+count_L_1_C_total+count_L_1_H_total)),
    });

    this.userResponseData.push({
      Level: 'Level 2',
      URI:this.baseLevelURI+2,
      PresentationScore: this.calculationResult(count_L_2_R_selected,count_L_2_R_total),
      ContentScore: this.calculationResult(count_L_2_C_selected,count_L_2_C_total),
      Hosting: this.calculationResult(count_L_2_H_selected,count_L_2_H_total),
      TotalScoreByLevel: this.calculationResult((count_L_2_R_selected+count_L_2_C_selected+count_L_2_H_selected),(count_L_2_R_total+count_L_2_C_total+count_L_2_H_total)),
    });

    this.userResponseData.push({
      Level: 'Level 3',
      URI:this.baseLevelURI+3,
      PresentationScore: this.calculationResult(count_L_3_R_selected,count_L_3_R_total),
      ContentScore: this.calculationResult(count_L_3_C_selected,count_L_3_C_total),
      Hosting: this.calculationResult(count_L_3_H_selected,count_L_3_H_total),
      TotalScoreByLevel: this.calculationResult((count_L_3_R_selected+count_L_3_C_selected+count_L_3_H_selected),(count_L_3_R_total+count_L_3_C_total+count_L_3_H_total)),
    });

    this.userResponseData.push({
      Level: 'Level 4',
      URI:this.baseLevelURI+4,
      PresentationScore: this.calculationResult(count_L_4_R_selected,count_L_4_R_total),
      ContentScore: this.calculationResult(count_L_4_C_selected,count_L_4_C_total),
      Hosting: this.calculationResult(count_L_4_H_selected,count_L_4_H_total),
      TotalScoreByLevel: this.calculationResult((count_L_4_R_selected+count_L_4_C_selected+count_L_4_H_selected),(count_L_4_R_total+count_L_4_C_total+count_L_4_H_total)),
    });

    this.userResponseData.push({
      Level: 'Level 5',
      URI:this.baseLevelURI+5,
      PresentationScore: this.calculationResult(count_L_5_R_selected,count_L_5_R_total),
      ContentScore: this.calculationResult(count_L_5_C_selected,count_L_5_C_total),
      Hosting: this.calculationResult(count_L_5_H_selected,count_L_5_H_total),
      TotalScoreByLevel: this.calculationResult((count_L_5_R_selected+count_L_5_C_selected+count_L_5_H_selected),(count_L_5_R_total+count_L_5_C_total+count_L_5_H_total)),
    });
  }

  calculationResult(num1:number,num2:number){
    if(num1 && num2) {
      return Math.round((num1/num2)*100);
    }
    else return 0;
  }

  radioChecked(sourceTab: number,data: QuestionModel,selectedOption: OptionsEntity,event?: any) {
    console.log(' questionID, selectedOptionID ',data.SectionId,selectedOption.Id,event.target.checked);
    let chekedValue = event.target.checked;
     if (sourceTab == 1)
      this.updateTabData(1,data, selectedOption.Id, chekedValue);
    else if (sourceTab == 2)
      this.updateTabData(2,data, selectedOption.Id, chekedValue);
    else if (sourceTab == 3)
      this.updateTabData(3,data, selectedOption.Id, chekedValue);
  }

  updateTabData(sourceTab:number,questionData: QuestionModel,selectedOptionID: number,value: boolean) {
    let dataSource : QuestionModel[] = [];
    if(sourceTab===1) dataSource = this.tab1Data;
    else if(sourceTab===2) dataSource = this.tab2Data;
    else if(sourceTab===3) dataSource = this.tab3Data;

    dataSource.map((question: QuestionModel) => {
      if (question.SectionId === questionData.SectionId) {
        // check if current questionID with each questionID of this category
        question.Options?.map((option: OptionsEntity) => {
          // loop through each options of that question
          if (questionData.MultipleAllowed === false) {
            // if it is radio button
            option.IsSelected = option.Id === selectedOptionID ? value : !value;
          } else {
            // if it is checkbox
            if (option.Id === selectedOptionID) option.IsSelected = value;
          }
        });

        // check whether the question is answered or not
        let answeredOptions = question.Options?.filter((x: OptionsEntity) => {
          return x.IsSelected === true;
        });
        question.IsAnswered =
          answeredOptions && answeredOptions?.length > 0 ? true : false;
      }
    });

    console.log('after update dataSource: ', dataSource);

    if(sourceTab===1)  this.tab1Data = [...dataSource];
    else if(sourceTab===2)  this.tab2Data = [...dataSource];
    else if(sourceTab===3)  this.tab3Data = [...dataSource];

    console.log('after update tab1Data: ', this.tab1Data);
    console.log('after update tab2Data: ', this.tab2Data);
    console.log('after update tab3Data: ', this.tab3Data);
  }


  // show modal after submitting user answers
  isVisible = false;
  isConfirmLoading = false;

  handleOk(): void {
    this.isVisible = false;
    this.isConfirmLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


    // show modal ForDetailedResult
    isVisibleForDetailedResult = false;
    isConfirmLoadingForDetailedResult = false;
    handleOkForDetailedResult(): void {
      this.isVisibleForDetailedResult = false;
      this.isConfirmLoadingForDetailedResult = false;
    }

    handleCancelForDetailedResult(): void {
      this.isVisibleForDetailedResult = false;
    }

    detailedResultData: any[] =[];
    detailedResultLevelToFilter = 0;

    selectedIndicatorsForDetailedResultLevel = 0;
    detailedResultLevelURI = "";
	calcDetailedResult(dt:any):any{
	  let level =   dt[dt.length-1];
      this.detailedResultLevelToFilter = level;
      this.detailedResultLevelURI = this.baseLevelURI+level+"/";
      this.detailedResultData = [];

      let allQuestions = this.appService.appData;
      for (let i = 0; i < allQuestions.length; i++) {
        // loop through each question
          for (let j = 0;j < allQuestions[i].Options?.length;j++ ) {
            // loop through each option
              const mValues = allQuestions[i].Options[j].MaturityLevel;
              if(mValues && mValues.includes(dt)){
                this.detailedResultData.push({
                  IndicatorId: allQuestions[i].Options[j].IndicatorId,
                  URI: allQuestions[i].Options[j].URI,
                  IndicatorText: allQuestions[i].Options[j].IndicatorText,
                  Category: allQuestions[i].Options[j].Category,
                  IsSelected: allQuestions[i].Options[j].IsSelected ||
                    this.checkSuperseded(allQuestions[i].Options,allQuestions[i].Options[j].SuperIndicators)
                  })
              }

          }
      }



      //iterate over the detailedResultsData and
      this.selectedIndicatorsForDetailedResultLevel = this.detailedResultData.filter((x:any)=>{
        return x.IsSelected===true
      }).length;
      console.log("this.detailedResultData: ",this.detailedResultData);
	  return {
		selectedIndicatorsForDetailedResultLevel: this.selectedIndicatorsForDetailedResultLevel,
        detailedResultLevelToFilter: this.detailedResultLevelToFilter,
        detailedResultData: this.detailedResultData
      }
    }
	showDetailedResult(dt:any){
      this.isVisibleForDetailedResult = true;
      this.isConfirmLoadingForDetailedResult = true;
	  this.calcDetailedResult(dt);
	}
	async print(){
      const data={userResponseData:this.userResponseData,details:[]};
	  for(const d of this.userResponseData){
              const detail = JSON.parse(JSON.stringify(this.calcDetailedResult(d.Level)));
			  (data.details as any).push(detail as any)
      }
      await this.router.navigateByUrl('/print', { state: {data}});
    }

    checkSuperseded(qoptions:[], superIndicators:string[]){

      let selected = false;

      if(superIndicators === null)
        return selected;

      for (let i = 0; i < superIndicators.length; i++) {

        var superIndicator = qoptions.find((obj:OptionsEntity) => {
          return obj.IndicatorId === superIndicators[i];
        });
        // @ts-ignore
        selected = selected || superIndicator?.IsSelected===true;
      }
      return selected;
  }
}

