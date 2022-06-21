
//example of models used throughout the application to ensure type safety

export interface ITracks {
    songs : IData[];
 }
 
 export interface IData {
     id :number,
     refNumber? : number,
     title :string,
     preview :string,
     artistname : string,
     albumtitle :string,
     albumcover_small : string
     playlistname?:string
 }
 export interface IIconVol {
     iconName : string,
     iconColor : string
 }
 export interface IShuffle
 {
     isshuffle : boolean,
     iconColor : string
 }