export interface Work{
    Title?: string;
    Description?: string;
    CreateDate?: string;
    DeadlineDate?: string;
    Owner?: Owner;
  }

  export interface Owner
  {
    UserId?: string;
    UserName?: string;
  }