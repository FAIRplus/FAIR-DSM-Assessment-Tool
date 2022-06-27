
export interface QuestionModel {
    DSMCategory: string;
    DSMCategoryID: number;
    SectioName: string;
    SectionId: number;
    Question: string;
    Options?: (OptionsEntity)[] | null;
    MultipleAllowed: boolean;
    NoneOfAboveAllowed: boolean;
    IsAnswered: boolean;
  }
  export interface OptionsEntity {
    Id: number;
    IndicatorId: string | null;
    IndicatorText: string;
    MaturityLevel: string | null;
    Category: string;
    SubCategory?: string | null;
    URI?: string |null;
    IsSelected: boolean;
  }


  export interface UserResponseData {
    Level: string;
    PresentationScore: number | string;
    ContentScore: number | string;
    Hosting: number| string;
    TotalScoreByLevel: number| string;
  }
  
