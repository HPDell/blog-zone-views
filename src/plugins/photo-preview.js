import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

export default ({ Vue }) => {
  Vue.use(preview, {
    shareEl: true,
    shareButtons: [
      {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
  ],
  });
}
