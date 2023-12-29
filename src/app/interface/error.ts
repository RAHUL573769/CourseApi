export type TIssue = Record<string, any>;
export type TErrorDetails = {
  issues: TIssue[];
  name?: string;
};

// export type TCastError = TErrorDetails | Record<string, any>;

export type TErrorResponse =
  | {
      success: boolean;
      message: string;
      errorMessage: string;
      errorDetails: TErrorDetails;
    }
  | Record<string, any>;
