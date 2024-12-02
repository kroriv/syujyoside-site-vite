//==============================================================================================
//
//  InViewAnimation
//
//==============================================================================================
// Motion
const { animate, scroll, inView } = Motion;

inView("#contact-form", () => {
  animate(
    "#contact-form .h2-v1",
    { x: [-1000, 0], opacity: [0, 1] },
    { duration: 0.30, delay: 0.15, easing: "easeIn" }
  );
});

//==============================================================================================
//
//  Validatior
//
//==============================================================================================

// バリデーション関数
function validateField(name, value) {
  let error = "";

  switch (name) {
    case "category":
      if (!document.querySelector(`input[name="category"]:checked`)) {
        error = "カテゴリーを選択してください。";
      }
      break;

    case "fullname":
      if (!value || validator.isEmpty(value)) {
        error = "お名前を入力してください。";
      }
      break;

    case "email":
      if (!value || !validator.isEmail(value)) {
        error = "正しいメールアドレスを入力してください。";
      }
      break;

    case "phonenumber":
      if (!value || !validator.matches(value, /^(\d{10}|\d{11}|(\d{4}-\d{2}-\d{4})|(\d{3}-\d{4}-\d{4}))$/)) {
        error = "正しい電話番号の形式で入力してください。";
      }
      break;

    case "preferred_1_m":
    case "preferred_1_d":
    case "preferred_2_m":
    case "preferred_2_d":
      const preferred_1_m = document.querySelector('input[name="preferred_1_m"]').value;
      const preferred_1_d = document.querySelector('input[name="preferred_1_d"]').value;
      const preferred_2_m = document.querySelector('input[name="preferred_2_m"]').value;
      const preferred_2_d = document.querySelector('input[name="preferred_2_d"]').value;

      if (!preferred_1_m || !validator.isInt(preferred_1_m, { min: 1, max: 12 }) ||
          !preferred_1_d || !validator.isInt(preferred_1_d, { min: 1, max: 31 })) {
        error = "第1希望日を正しく入力してください。";
      } else if (!preferred_2_m || !validator.isInt(preferred_2_m, { min: 1, max: 12 }) ||
                 !preferred_2_d || !validator.isInt(preferred_2_d, { min: 1, max: 31 })) {
        error = "第2希望日を正しく入力してください。";
      }
      break;

    case "preferred_time":
      if (!document.querySelector(`input[name="preferred_time"]:checked`)) {
        error = "希望時間を選択してください。";
      }
      break;

    case "content":
      if (!value || validator.isEmpty(value)) {
        error = "内容・備考を入力してください。";
      }
      break;

    default:
      break;
  }

  return error;
}

// エラーメッセージ表示関数
function displayError(name, error) {
  const field = document.querySelector(`[name="${name}"]`);
  if (!field) return; // フィールドが見つからない場合は終了
  const rowElement = field.closest(".row");
  if (!rowElement) return; // .rowが見つからない場合は終了
  rowElement.classList.add("valid");
  if (error) {
    rowElement.classList.remove("valid");
    rowElement.classList.add("invalid");
  }
  const errorElement = rowElement.querySelector("p.error");
  errorElement.textContent = error;
}

// フォーカスが外れた時のバリデーション
document.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("blur", (e) => {
    const rowElement = field.closest(".row");
    rowElement.classList.remove("invalid");
    const name = e.target.name;
    const value = e.target.value;
    const error = validateField(name, value);
    displayError(name, error);
  });
});

// サブミット時のバリデーション
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // エラーをリセット
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  // 各項目をバリデーション
  const fields = ["category", "fullname", "email", "phonenumber", "preferred_1_m", "preferred_1_d", "preferred_2_m", "preferred_2_d", "preferred_time", "content"];
  let isValid = true;

  fields.forEach((name) => {
    const value = document.querySelector(`[name="${name}"]`)?.value || "";
    const error = validateField(name, value);
    if (error) isValid = false;
    displayError(name, error);
  });

  if (isValid) {
    alert("送信成功！");
    // フォーム送信処理などを実行
  }
});