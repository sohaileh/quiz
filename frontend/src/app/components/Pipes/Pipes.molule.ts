import { NgModule } from "@angular/core"
import { SanitizedHtmlPipe } from "./sanitized-html"



@NgModule({
    imports:[],
    declarations:[SanitizedHtmlPipe],
    exports:[SanitizedHtmlPipe]
})

export class CustomPipesModule{
    
}