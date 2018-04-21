import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Link from '@ckeditor/ckeditor5-link/src/link'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import List from '@ckeditor/ckeditor5-list/src/list'
import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor'

function Markdown(editor) {
  editor.data.processor = new GFMDataProcessor()
}

ClassicEditor
  .create(document.querySelector('#snippet-markdown'), {
    plugins: [
      Essentials,

      Heading,
      Bold,
      Italic,
      Link,
      List,
      Blockquote,
      Code,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Markdown
    ],
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'code',
      'imageUpload',
      'undo',
      'redo'
    ],
    image: {
      toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
    }
  })
  .then(editor => {
    window.editor = editor

    const outputElement = document.querySelector('#snippet-markdown-output')

    editor.model.document.on('change', () => {
      outputElement.innerText = editor.getData()
    })

    // Set the initial data with delay so hightlight.js doesn't catch them.
    setTimeout(() => {
      outputElement.innerText = editor.getData()
    }, 500)
  })
  .catch(err => {
    console.error(err.stack)
  })
