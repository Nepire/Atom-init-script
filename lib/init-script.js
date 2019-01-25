'use babel';

import snippet from './snippet'
import InitScriptView from './init-script-view';
import { CompositeDisposable } from 'atom';

export default {

  myPackageView: null,
  modalPanel: null,
  subscriptions: null,

  initialize(state){

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
  },

  serialize() {
    return {
      initScriptViewState: this.initScriptView.serialize()
    };
  },
  initScript(editorSource){
      let editor = editorSource ? editorSource : atom.workspace.getActiveTextEditor()
      

  }

  toggle() {
      this.initScript()
    );
  }

};
