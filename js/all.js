const url = "https://hexschool.github.io/js-filter-data/data.json";
const method = 'GET';
let data;
let showData = [];
let category = '';

// table
const filterTable = document.querySelector('.filter-table tbody');
// 搜尋按鈕
const searchBtn = document.querySelector('.search-btn');
// 搜尋提示
const searchMessage = document.querySelector('.search-message');
// 搜尋輸入欄
let searchInput = document.querySelector('.search-input');
// tag button group
let tagGroup = document.querySelector('.tagGroup')
let tagButton = document.querySelectorAll('.tagGroup button')
// 下拉篩選選單
let select = document.querySelector('.sortFilter')



// 取得資料
axios.get(url)
.then( response => {
  data = response.data.filter(item => item.作物名稱);
  console.log(response);
})
.catch( error => {
  console.dir(error);
});

// 搜尋行為
searchBtn.addEventListener('click', search);
searchInput.addEventListener('keyup', event => {
  if(event.key == 'Enter'){
    search(event);
  };
});
// tag 行為
tagGroup.addEventListener("click",tagGet);
// 下拉篩選行為
select.addEventListener('change', sortFilter);

// 渲染畫面
function render(data){
  let str = "";
  data.forEach((item, index) => {
    let content = `<tr>
      <th scope="row">${item.作物名稱}</th>
      <td>${item.市場名稱}</td>
      <td>${item.上價}</td>
      <td>${item.中價}</td>
      <td>${item.下價}</td>
      <td>${item.平均價}</td>
      <td>${item.交易量}</td>
    </tr>`;
    str += content;
  });
  filterTable.innerHTML = str;
}

// 渲染 table message
function tableMessage(message) {
  filterTable.innerHTML = `
    <tr class="text-center">
      <th colspan="7" class="py-4">
      ${message}</th>
    </tr>
  `;
}

// 搜尋
function search(event){
  inputValue = searchInput.value.replace(/\s+/g, '');
  showData = data.filter( item => item.作物名稱.match(inputValue));

  tagButton.forEach(item => {
    item.classList.remove('btn-active')
  });

  if(inputValue !== ''){
    searchMessage.innerHTML = `查看「${inputValue}」的比價結果`;

    if(showData.length !== 0){
      tableMessage("資料載入中...");
      render(showData);
    }else{
      tableMessage("查詢不到當日的交易資訊QQ");
    };

  }else{
    alert("輸入欄位不得為空。");
    tableMessage("請輸入並搜尋想比價的作物名稱^＿^");
    searchMessage.innerHTML = '';
  };

  // 清空欄位
  searchInput.value = '';
  event.preventDefault();
}

// tag
// 種類代碼: 'N04', 蔬菜
// 種類代碼: 'N05', 水果
// 種類代碼: 'N06', 花卉
function tagGet(e) {
  if(e.target.nodeName == "BUTTON"){
    tagButton.forEach(item => {
      item.classList.remove('btn-active')
      e.target.classList.add('btn-active')
    })

    category = e.target.dataset.category;
    showData = data.filter( item => item.種類代碼 == category);
    searchMessage.innerHTML = `查看「${e.target.value}」的比價結果`;
    tableMessage("資料載入中...");
    return render(showData);
  }else{
    return;
  }
}

// 下拉選單
function sortFilter(e) {
  if(showData.length == 0){
    alert("請先輸入蔬果類別再做排序！");
    select.value = "排序篩選";
  }

  switch (e.target.value) {
    case "上價":
      sortValue("上價");
      break;
    case "中價":
      sortValue("中價");
      break;
    case "下價":
      sortValue("下價");
      break;
    case "平均價":
      sortValue("平均價");
      break;
    case "交易量":
      sortValue("交易量");
      break;
  }
}
function sortValue(value) {
  showData.sort((a,b)=> b[value] - a[value]);
  render(showData);
}
