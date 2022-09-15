
export interface QuestionModel {
    DSMCategory: string;
    DSMCategoryId: number;
    SectionName: string;
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
    SuperIndicators: string[] | null;
  }


  export interface UserResponseData {
    Level: string;
    URI: string;
    PresentationScore: number | string;
    ContentScore: number | string;
    Hosting: number| string;
    TotalScoreByLevel: number| string;
  }

