'use babel';

import InitScriptView from './init-script-view';
import snippet from './snippet'
import { CompositeDisposable } from 'atom';

export default {

  initScriptView: null,
  modalPanel: null,
  subscriptions: null,

  initialize(state){
      this.idisposable = atom.workspace.observeActivePaneItem(
          editor => {
              if(!editor || !editor.getText) return ;
              let ochangeTitle = editor.onDidChangeTitle( () => { this.initScript(editor); })
              editor.onDidDestroy( () => {ochangeTitle.dispose();} )
              this.initScript(editor)
          }
      )

  }

  activate(state) {
    this.initScriptView = new InitScriptView(state.initScriptViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.initScriptView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'init-script:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.initScriptView.destroy();
    this.disposable.dispose()
  },

  serialize() {
    return {
      initScriptViewState: this.initScriptView.serialize()
    };
  },
  initScript(editorSource){
      let editor = editorSource ? editorSource : atom.workspace.getActiveTextEditor()
      if(editor){
          let filename = editor.getTitle()
          let index=filename.lastIndexOf(".")
          if(index === -1) return
          let suffix=filename.substr(index+1,filename.length-index-1)
          if(suffix == 'c') suffix = "c"
          if(suffix == 'cpp') suffix = "cpp"
          if(suffix == 'py') suffix = "python"
          if(suffix == 'go') suffix = "go"
          if(editor.getText().trim() != '')return
          let str = snippet[suffix]
          str && (editor.insertText(str))
      }


  }

  toggle() {
      this.initScript()
    );
  }

};
