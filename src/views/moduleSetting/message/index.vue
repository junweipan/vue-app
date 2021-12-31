<template>
<div class="dashboard-container">
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="auto">
    </el-table-column>
        <el-table-column
      prop="date"
      label="日期"
      width="auto">
    </el-table-column>
        <el-table-column
      prop="title"
      label="标题"
      width="auto">
    </el-table-column>
        <el-table-column
      prop="detail"
      label="详情"
      width="600px">
    </el-table-column>
    <el-table-column
      prop=""
      label="创建时间"
      width="auto">
    </el-table-column>
    <el-table-column
      prop=""
      label="修改时间"
      width="auto">
    </el-table-column>
        <el-table-column
      prop=""
      label="其他栏-1"
      width="auto">
    </el-table-column>
        <el-table-column
      prop=""
      label="其他栏-2"
      width="auto">
    </el-table-column>
  </el-table>
</div>

</template>

<script>
  export default {
    data() {
      return {
      tableData: [
        {
          id: "1",
          date: "2021年12月6日 10:16 AM",
          title: "砂拉越州选料有多角战",
          detail: `早报讯）马来西亚砂拉越州选举的提名时间已结束。
          “当今大马”报道，提名时间从周一（6日）早上9时开始，10时结束。
          砂拉越州共有82个州议席，多个议席料会出现多角战。`,
        },
        {
          id: "2",
          date: "2021年12月6日 9:50 AM",
          title: "王毅：反对西方将民主标准强加于人",
          detail: `中国国务委员兼外长王毅昨天（5日）在浙江安吉同印尼对华合作牵头人、
          统筹部长卢胡特举行会谈。双方就民主问题交换意见，一致认为各国应根据自身国情推进民主建设，
          应以本国人民是否满意作为评判的依据，而不是把西方自己的标准强加于人。
          据中国外交部昨天发布的新闻稿，王毅在会上说，中国将全力支持印尼举办明年二十国集团领导人峰会，
          愿共同推动二十国集团为促进世界复苏发展和完善全球经济治理发挥积极作用。
          王毅称，中印尼疫苗合作在地区和全球层面持续领跑，并表示愿意同印尼落实中国国家主席习近平“中国东盟健康之盾”重要倡议，
          持续深化疫苗和药物研发合作。`,
        },
        {
          id: "3",
          date: "2021年12月6日 10:12 AM",
          title: "深圳卫健委公号被投诉低俗 回应称会收缩尺度",
          detail: `广东省深圳市卫健委旗下微信公众号被网民投诉以低俗标题吸眼球博流量，深圳卫健委回应称，
          将适当收缩开放的推文尺度，做到雅俗共赏、老少皆宜。据澎湃新闻报道，
          深圳市卫健委旗下的“深圳卫健委”微信公众号因其活泼的内容、生动的传播形式获得广泛关注，但也有网友表达不同意见。
          有网友10月26日在人民网“领导留言板”上以“公众号低俗标题吸眼球博流量”为题，向深圳市委书记王伟中反映：
          “某医疗机构的微信公众号，使用标题党吸引人眼球博得流量。建议进行整改。”`,
        },
        {
          id: "4",
          date: "2021年12月6日 9:43 AM",
          title: "易华仁本月5日至11日到访布鲁塞尔和伦敦",
          detail: `（早报讯）我国主管贸易关系的交通部长易华仁在12月5日至11日到访布鲁塞尔和伦敦，这肯定了新加坡与两国的长期稳定关系，尤其是在交通和贸易领域。
          交通部和贸工部12月6日联合发文告指出，易华仁将在布鲁塞尔与欧盟委员会交通专员阿迪娜·瓦莉安（Adina Vălean）会面。
          这次会面将加强双方在交通领域方面的合作。易华仁将同欧盟贸易专员东布洛夫斯基斯（Valdis Dombrovskis）主持欧盟—新加坡自贸协定（EUSFTA）贸易委员会会议`,
        },
      ],
      }
    }
  }
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pagination {
  float: right;
  margin-top: 20px;
}
</style>