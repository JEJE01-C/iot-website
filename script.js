
// 전역 데이터베이스 변수 선언
var database;

// Firebase 설정
var config = {
  apiKey: "AIzaSyATH3Pww-UnpigbMPYNBGt9dOTKQijULnk",
  authDomain: "myweb-d8073.firebaseapp.com",
  databaseURL: "https://myweb-d8073-default-rtdb.firebaseio.com",
  projectId: "myweb-d8073",
  storageBucket: "myweb-d8073.firebasestorage.app",
  messagingSenderId: "525543258950",
  appId: "1:525543258950:web:1b83e7ba3496c8d094c347"
};

// Firebase 초기화
firebase.initializeApp(config);
database = firebase.database();

function ledOn(){
  console.log("led 켜짐");
  var ref = database.ref('led');
  ref.update({led: 1});
}

function ledOff(){
  console.log("led 꺼짐");
  var ref = database.ref('led');
  ref.update({led: 0});
}

// Firebase 데이터베이스 정보 가져오기
var ref = database.ref("led");
ref.on("value", gotData);

// 온도 데이터 실시간 수신 및 표시
var tempRef = database.ref("temperature");
tempRef.on("value", function(snapshot) {
  var temp = snapshot.val();
  var tempDiv = document.getElementById("temperature");
  if (tempDiv) {
    if (temp !== null) {
      tempDiv.innerHTML = `<span style='font-size:1em; color:#222; font-weight:bold; letter-spacing:1px;'>현재온도 :</span> <b style='color:#2196f3; background: #e3f2fd; padding: 4px 12px; border-radius: 14px; font-size:1.1em; box-shadow:0 2px 8px #b3e5fc;'>${temp} ℃</b>`;
    } else {
      tempDiv.innerHTML = `<span style='font-size:1em; color:#222; font-weight:bold; letter-spacing:1px;'>현재온도 :</span> <b style='color:#2196f3; background: #e3f2fd; padding: 4px 12px; border-radius: 14px; font-size:1.1em; box-shadow:0 2px 8px #b3e5fc;'>-- ℃</b>`;
    }
  }
});

function gotData(data) {
  var val = data.val();
  if (val && val.led === 0) {
    document.getElementById("img").src = "ledOff.png";
  } else if (val && val.led === 1) {
    document.getElementById("img").src = "ledOn.png";
  }
  console.log(val);
}
