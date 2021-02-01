<template lang="pug">
  #order
    v-app
      v-form(@submit.prevent="onSubmit")
        v-stepper(v-model='e6' vertical)
          v-stepper-step(:complete='e6 > 1' step='1' color="#677d35" complete)  預約說明
          v-stepper-content(step='1')
            v-card.step1.mb-12(outlined)
              p 此單為報名預約用, 不收取訂金, 因此也不代表檔期預約成功喔！收到表單後, 我們會回覆您所需方案內容
                br
                br
                | 🔸 GP photolab只提供攝影服務（不含造型、禮服，為了婚紗影像的質感,請從攝影方案的推薦名單自行挑選您喜愛的造型師及禮服廠商)
                br
                | 🔸 GP photolab全面停接婚禮紀錄攝影
                br
                | 🔸 為了確保攝影及修片的品質, 請詳細確定婚禮日期/ 婚紗拍攝與婚禮日期前後相差至少4-6個月以上/ 如尚未有婚期也可以填單先索取方案參考
                br
                | 🔸 GP photolab會依據客戶所預約的攝影時程, 以Email與您聯繫並討論正式預約時間及拍攝事項
                br
                | 🔸 雙方討論出一致的方向後（拍攝事項、時程、價格等）, GP photolab會Email正式訂單, 收到後, 您即可先填妥資料並開始尋找拍攝風格、造型、禮服囉！註: 檔期不做口頭保留, 是以同時收到訂金＋訂單才算檔期預約成功
                br
                | 🔸 若有海外婚紗或較遠地區拍攝需求, 請提前告知
                br
                | 🔸 車資: 拍攝地點以臺南優先, 新人車馬自理, 台南以外需車馬出差費
            v-card.step1.mb-12(outlined)
              P 📣2020年度限定- 醫護人員拍攝三套婚紗特別優惠- 85折
                br
                | 感謝醫護人員於前線防疫的辛勞
                br
                | 『凡具有醫事人員身份, 即日起預約今年底前拍攝三套婚紗方案, 即享85折優惠』
                br
                | 優惠對象：醫師、護理師、藥師、醫院行政人員等醫事人員
                br
                | 優惠限定拍攝時間：2020年底前完成拍攝
                br
                | 預約方式：填寫預約單時備註「醫護人員」
                br
                | 出示證件：請於小P回信預約單後, 於信件出示證件（醫院識別證、工作證等）
            v-card.step1.mb-12(outlined)
              P 📣 GP攝影師至2021年上半年的檔期皆已額滿 (請選擇團隊其他攝影師拍攝）
                br
                | GP攝影師檔期只開放到2021年上半年, 如希望由她拍攝, 最快須排隊等候她2021年下半年的檔期（預計今年底才會開放）, 因排隊人數眾多, 檔期也限額少量, 如有婚期急迫性的新人, 請參考團隊其他攝影師們
            v-checkbox(v-model='agreeStatement' color="#677d35" label="詳細閱讀且同意")
            v-btn(rounded color='#677d35' @click='e6 = 1' dark) 上一步
            v-btn(rounded color='#677d35' :disabled="invalid" @click='e6 = 2' href='#' dark) 下一步
          v-stepper-step(rounded :complete='e6 > 2' step='2' color="#677d35") 選擇方案
          v-stepper-content(step='2')
            v-card.step2.mb-12
              h3 選擇您的拍攝項目
              v-radio-group(v-model='project' mandatory)
                v-radio(color="#677d35" value="七夕限定織女包套方案" label="七夕限定織女包套方案/ 拍攝日期限2020年8月～2021年2月, 參與攝影師：榮格、壹壹、刷牙  (刷牙只開放明年1,2月)")
                v-radio(color="#677d35" value="三套婚紗拍攝" label="三套婚紗拍攝/ 2020年底前每個月前十組預約可享9折優惠(優惠不含婚紗側錄)")
                v-radio(color="#677d35" value="一套婚紗" label="一套婚紗/ 開放多一套便服拍攝")
                v-radio(color="#677d35" value="單人婚紗" label="單人婚紗/ 攝影師GP停接此方案")
                v-radio(color="#677d35" value="姐妹婚紗" label="姐妹婚紗/ 攝影師GP停接此方案")
                v-radio(color="#677d35" value="孕媽咪寫真" label="孕媽咪寫真 /不拍禮服、便服為主; 攝影師GP停接此方案; 新人回娘家打9折")
                v-radio(color="#677d35" value="親子寫真" label="親子寫真 /不拍禮服、便服為主; 攝影師GP停接此方案; 新人回娘家打9折")
                v-radio(color="#677d35" value="情侶寫真" label=" 情侶寫真 /不拍禮服、便服為主; 攝影師GP停接此方案")
                v-radio(color="#677d35" value="人像寫真" label="人像寫真 /不拍禮服、便服為主; 攝影師GP停接此方案")
              h3 選擇您的拍攝師
              v-chip-group(v-model='photographer' column multipl emandatory color="#677d35")
                v-chip(value="GP" filter outlined) GP
                v-chip(value="榮格" filter outlined) 榮格
                v-chip(value="壹壹" filter outlined) 壹壹
                v-chip(value="刷牙" filter outlined) 刷牙
              h3 選擇您的拍攝日期
              v-col(cols='12' sm='6' md='4')
                v-dialog(ref='dialog' v-model='modal' :return-value.sync='date' persistent width='350px')
                  template(v-slot:activator='{ on, attrs }')
                    v-text-field(
                      v-model='date'
                      label="Select Date"
                      prepend-icon='mdi-calendar'
                      readonly v-bind='attrs'
                      v-on='on'
                      color="#677d35"
                      clearable
                      @click:clear="date = null"
                      :allowed-dates="allowedDates"
                      )
                  v-date-picker(
                    v-model='date'
                    scrollable
                    color="#677d35"
                    :min="new Date().toISOString()")
                    v-spacer
                    v-btn(text color='#677d35' rounded @click='modal = false') 取消
                    v-btn(text color='#677d35' rounded @click='$refs.dialog.save(date)') 確認
            v-btn(rounded color='#677d35'  @click='e6 = 1' href='#' dark) 上一步
            v-btn(v-if="(this.$data.agreeStatement === false || this.$data.date === null || this.$data.photographer === null)" rounded color='#677d35'  @click='check' dark) 下一步
            v-btn(v-else rounded color='#677d35'  @click='e6 = 3' href='#' dark) 下一步
          v-stepper-step(:complete='e6 > 3' step='3' color="#677d35") 預約確認
          v-stepper-content(step='3')
            v-card.step3.mb-12
              validation-observer( ref="observer" v-slot="{ invalid }")
                v-card-text
                  validation-provider(v-slot="{ errors }" rules="required")
                    v-text-field(
                        color="#000000"
                        v-model="project"
                        filled
                        rounded
                        readonly
                        prefix=' 拍攝項目｜')
                  validation-provider(v-slot="{ errors }" rules="required")
                    v-text-field(
                      color="#000000"
                      v-model="date"
                      filled
                      rounded
                      readonly
                      prefix=' 拍攝日期｜')
                  validation-provider(v-slot="{ errors }" rules="required")
                    v-text-field(
                      color="#000000"
                      v-model="photographer"
                      filled
                      rounded
                      readonly
                      prefix=' 攝影師｜')

                  v-btn(rounded color='#677d35' @click='e6 = 2' href='#' dark) 上一步
                  v-btn(:disabled="invalid" rounded color='#677d35' type="submit" dark) 送出
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

export default {
  data () {
    return {
      e6: 1,
      modal: false,
      date: null,
      agreeStatement: false,
      project: '',
      photographer: null
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    check () {
      if (this.$data.agreeStatement === false) {
        this.$swal({
          title: '預約說明請打勾'
        })
      } else if (this.$data.photographer === null) {
        this.$swal({
          title: '請選擇攝影師'
        })
      } else if (this.$data.date === null) {
        this.$swal({
          title: '請選擇日期'
        })
      }
    },
    onSubmit () {
      this.$refs.observer.validate()
      this.axios.post(process.env.VUE_APP_API + '/users/order/' + this.$store.state.user.id, this.$data)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '表單成立',
              showConfirmButton: false,
              timer: 1000
            })
            res.data.result.src = process.env.VUE_APP_API + '/albums/file/' + res.data.result.file
            setTimeout(() => {
              this.$router.push({ path: '/user/order', name: 'OrderList' })
            }, 1000)
          } else {
            this.$swal({
              icon: 'error',
              title: '發生錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '發生錯誤',
            text: err.response.data.message
          })
        })
    }
  }
}
</script>
