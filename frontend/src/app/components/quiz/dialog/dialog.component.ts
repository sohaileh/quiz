import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  ckeConfig: { allowedContent: boolean; forcePasteAsPlainText: boolean; removePlugins: string; removeButtons: string; };

  constructor() {

    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removePlugins: "horizontalrule,specialchar,about,list,others",
      removeButtons:
        "Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Cut,Copy,Paste,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline,exportpdf",
    };

   }

  ngOnInit(): void {
  }

}
