const url = "https://hexschool.github.io/js-filter-data/data.json";
const req = new XMLHttpRequest();
const method = 'get';
let data;
let showData;

// table
const filterTable = document.querySelector('.filter-table tbody');
// 搜尋按鈕
const searchBtn = document.querySelector('.search-btn');
// 搜尋提示
const searchMessage = document.querySelector('.search-message');
// 搜尋輸入欄
const searchInput = document.querySelector('.search-input');

// 搜尋行為
searchBtn.addEventListener('click', search);
searchInput.addEventListener('keyup', e => {
  if(e.key == 'Enter'){
    search(e);
  };
});

// 取得資料
function getData(){
  req.open(method, url);
  req.onload = function(res){
    data = res.data.filter(item => item.作物名稱)
  };
  req.send();
};

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
function search(e){
  searchInput = searchInput.value.replace(/\s+/g, '');
  data = data.filter( item => item.作物名稱.match(searchInput));

  if(searchInput !== ''){
    searchMessage.innerHTML = `查看「${searchInput.value}」的比價結果`;

    if(data.length !== 0){
      tableMessage("資料載入中...");
      render(data);
    }else{
      tableMessage("查詢不到當日的交易資訊QQ");
    };

  }else{
    alert("輸入欄位不得為空。");
  };

  // 清空欄位
  searchInput.value = '';
}
