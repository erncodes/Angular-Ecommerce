export class User{
constructor
    (
      public email : string,
      public userId : string,
      private _userToken : string,
      private tokenExpiry :Date 
    ){}

get UserToken()
    {
        return this._userToken;
    }
}