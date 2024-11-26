// 模拟从数据库获取 SQL 语句分类列表
const categories = [
  {
    category_id: 1,
    category_name: "数据查询"
  },
  {
    category_id: 2,
    category_name: "数据插入"
  },
  {
    category_id: 3,
    category_name: "数据更新"
  }
];

// 模拟从数据库获取特定分类下的 SQL 复习题目列表
function getQuestionsByCategory(categoryId) {
  if (categoryId === 1) {
    return [
      {
        question_id: 1,
        question_text: "以下SQL语句：select * from tablea where b = 'xiexie' [order by/sort by] name，要实现按name列排序，[order by/sort by]处应选择什么？",
        options: [
          "order by",
          "sort by"
        ],
        correct_answer: "order by"
      },
      {
        question_id: 2,
        question_text: "在名为 `students` 的表中，要查询所有学生的姓名和年龄，正确的SQL语句应该是？",
        options: [
          "SELECT name, age FROM students;",
          "INSERT INTO students (name, age) VALUES ('John', 20);",
          "UPDATE students SET age = 21;",
          "DELETE from students WHERE age < 18;"
        ],
        correct_answer: "SELECT name, age FROM students;"
      }
    ];
  } else if (categoryId === 2) {
    // 其他分类的题目数据...
  }
}

// 加载语句分类列表到页面
function loadCategoryList() {
  const categoryListDiv = document.getElementById('category-list');
  categories.forEach((category) => {
    const categoryItem = document.createElement('category-item');
    categoryItem.className = 'category-item';
    categoryItem.textContent = category.category_name;
    categoryItem.addEventListener('click', () => showQuestionsByCategory(category.category_id));
    categoryListDiv.appendChild(categoryItem);
  });
}

// 展示特定分类下的题目列表
function showQuestionsByCategory(categoryId) {
  const database = getSelectedDatabase();
  const questions = getQuestionsByDatabaseAndCategory(database, categoryId);
  const statementDetailsDiv = document.getElementById('statement-details');
  statementDetailsDiv.innerHTML = "";
  let questionDivs = [];

  questions.forEach((question) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
      <p>${question.question_text}</p>
      <span id="answer-span-${question.question_id}">
        select * from tablea where b = 'xiexie' 
        <select id="answer-${question.question_id}">
          ${question.options.map((option) => `<option>${option}</option>`).join('')}
        </select>
        name
      </span>
    `;
    statementDetailsDiv.appendChild(questionDiv);
    questionDivs.push(questionDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = "提交答案";
  submitButton.addEventListener('click', () => checkAnswers(questionDivs, questions));
  statementDetailsDiv.appendChild(submitButton);
}

// 根据选中的数据库和分类获取题目列表
function getQuestionsByDatabaseAndCategory(database, categoryId) {
  const category = categories.find(c => c.category_id === categoryId);
  return category.questions.filter(q => q.applicable_databases.includes(database));
}

// 获取当前选中的数据库按钮
function getSelectedDatabase() {
  const mysqlButton = document.getElementById('mysql-button');
  const sqlServerButton = document.getElementById('sql-server-button');
  const oracleButton = document.getElementById('oracle-button');

  if (mysqlButton.classList.contains('active')) {
    return 'MySQL';
  } else if (sqlServerButton.classList.contains('active')) {
    return 'SQL Server';
  } else if (oracleButton.classList.contains('active')) {
  return 'Oracle';
  }

  // 默认选中MySQL
  mysqlButton.classList.add('active');
  return 'MySQL';
}

// 检查答案并标记错误选项
function checkAnswers(questionDivs, questions) {
  const resultDiv = document.getElementById('statement-details');
  resultDiv.innerHTML = "";

  questions.forEach((question, index) ) {
    const selectedAnswer = document.getElementById(`answer-${question.question_id}`).value;
    const isCorrect = selectedAnswer === question.correct_answer;

    const questionDiv = questionDivs[index];
    const optionElements = questionDiv.querySelectorAll('select option');

    optionElements.forEach((option) => {
      if (option.value === question.correct_answer) {
        if (isCorrect) {
          option.classList.add('correct');
        } else {
          option.classList.add('incorrect');
        }
      } else if (option.value === selectedAnswer &&!isCorrect) {
        option.classList.add('incorrect');
      }
    });

    const feedbackDiv = document.createElement('div');
    feedbackDiv.textContent = `${question.question_text} - 您的答案：${selectedAnswer}，正确答案：${question.correct_answer}。${isCorrect? '回答正确！' : '回答错误！'}`;
    feedbackDiv.className = 'feedback';
    resultDiv.appendChild(feedbackDiv);
  }
}

// 为数据库按钮添加点击事件处理函数
function setupDatabaseButtonClickHandlers() {
  const mysqlButton = document.getElementById('mysql-button');
  const sqlServerButton = document.getElementById('sql-server-button');
  const oracleButton = document.getElementById('oracle-button');

  mysqlButton.addEventListener('click', () => {
    clearDatabaseButtonActiveClass();
    mysqlButton.classList.add('active');
  });

  sqlServerButton.addEventListener('click', () => {
  clearDatabaseButtonActiveClass();
    sqlServerButton.classList.add('active');
  });

  oracleButton.addEventListener('click', () => {
    clearDatabaseButtonActiveClass();
    oracleButton.classList.add('active');
  });
}

// 清除所有数据库按钮的选中状态（移除active类）
function clearDatabaseButtonActiveClass() {
  const mysqlButton = document.getElementById('mysql-button');
  const sqlServerButton = document.getElementById('sql-server-button');
  const oracleButton = document.getElementById('oracle-button');

  mysqlButton.classList.remove('active');
  sqlServerButton.classList.remove('active');
  oracleButton.classList.remove('active');
}

// 页面加载完成时执行加载分类列表和设置数据库按钮点击事件处理函数的操作
window.onload = function() {
  loadCategoryList();
  setupDatabaseButtonClickHandlers();
};