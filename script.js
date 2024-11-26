// 加载JSON categories.json文件中的分类数据
async function populate() {
  // load categories
  // const requestURL ="https://raw.githubusercontent.com/xiangxinotes/sql-wizland/main/json/categories.json";
  const requestURL = "json/categories.json"
  const request = new Request(requestURL);

  const response = await fetch(request);
  const categories = await response.json(); // 用于存储从JSON文件读取的分类数据
  categories.push({
    "category_id": 0,
    "category_name": "关于 SQL Wizland"
  })
  populateCategoryList(categories);
  populateIntroduction();
}

// 加载语句分类列表到页面
function populateCategoryList(obj) {
  const categoryListDiv = document.getElementById('category-list');
  obj.forEach((category) => {
  // for (const category of obj) {
    const categoryItem = document.createElement('category-item');
    categoryItem.className = 'category-item';
    categoryItem.textContent = category.category_name;
    categoryItem.addEventListener('click', () => showQuestionsByCategory(category.category_id));
    categoryListDiv.appendChild(categoryItem);
  // };
  });
}

// 加载介绍信息到网站首页面
function populateIntroduction(){
  const statementDetailsDiv = document.getElementById('statement-details');
  statementDetailsDiv.innerHTML = "";
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
    questionDiv.innerHTML = `
    <div class="quick_start_container">
        <h1>还在为精准记忆 SQL 语句发愁？</h1>
        <p>传统学习方法总是学了就忘，不尽人意。</p>
        <p>SQL Wizland 提供针对性复习，助您轻松掌握SQL！</p>
        <div class="quick_start_buttons">
            <div class="quick_start_button">
                <h3>数据查询</h3>
                <p>通用基础，关联万千，巩固提升</p>
            </div>
            <div class="quick_start_button">
                <h3>数据插入</h3>
                <p>多种体裁，润色校对，一键成文</p>
            </div>
            <div class="quick_start_button">
                <h3>数据更新</h3>
                <p>自定义风格，搜集灵感，复制同款</p>
            </div>
            <div class="quick_start_button">
                <h3>AI阅读</h3>
                <p>论文课件，财报合同，翻译总结</p>
            </div>
            <div class="quick_start_button">
                <h3>学术搜索</h3>
                <p>海量论文，严谨问答，可靠来源</p>
            </div>
            <div class="quick_start_button">
                <h3>更多</h3>
                <p>点击展示更多技能</p>
            </div>
        </div>
    </div>
    `;
  statementDetailsDiv.appendChild(questionDiv);
}

// 加载JSON questions.json文件中的分类数据
async function loadQuestions() {
  // load categories
  const requestURL ="https://raw.githubusercontent.com/xiangxinotes/sql-wizland/main/json/questions.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const questions = await response.json(); // 用于存储从JSON文件读取的分类数据

  populateQuestions(questions);
}

// 加载问题到对应页面
function populateQuestions(obj){

}

// 模拟从数据库获取特定分类下的 SQL 复习题目列表
function getQuestionsByCategory(categoryId) {
  if (categoryId === 1) {
    return [
      {
        question_id: 1,
        question_text_before_options: "select * from tablea where b = 'xiexie'",
        options: [
          "order by",
          "sort by"
        ],
        question_text_after_options: " name",
        correct_answer: "order by"
      }
    ];
  } else if (categoryId === 2) {
    // 其他分类的题目数据...
  }
}

function showAbout(){
  // const dbButtonsDiv = document.getElementById('database-buttons-row');
  // dbButtonsDiv.innerHTML = "";
  const statementDetailsDiv = document.getElementById('statement-details');
  statementDetailsDiv.innerHTML = "";
  const aboutDiv = document.createElement('div');
  aboutDiv.className = 'about';
    aboutDiv.innerHTML = `
      <h1>为什么选择 SQL Wizland？</h1>
      <h2>数据会说话</h2>
      <p>
        职友集数据显示，2024 年 SQL 开发工程师的市场需求较 2023 年同期对比增长 486%。
        软件开发公司中 66.7% 的 SQL 开发工程师岗位月薪 15-30k，年薪 18-36w，其工资待遇比软件开发公司平均工资高出 23.7%。
        2024 年 CSDN 对近 1000 万条招聘信息的调查结果显示，SQL 占招聘职位的 8.2%，在编程语言类招聘需求中排名超过 C# 等编程语言。
      </p>
      <p>这些数据告诉我们：掌握 SQL 刻不容缓。</p>
      <h2>SQL Wizland 的使命</h2>
      <p>
        如果您去搜索，您会发现市面上有很多刷题网站，这些刷题网站并不利于只想保持对 SQL 语句熟悉感的人。这些人往往已经拥有解题逻辑，但缺少一个地方加深对具体语句用词的印象。SQL Wizland 了解这一痛苦，并因此应运而生。
      </p>
      <p>
        SQL Wizland 和传统的刷题网站有鲜明的差异，SQL Wizland 专注于 <strong>SQL 语句复习</strong>领域。
      </p>
      <p>
        SQL Wizland 深知您的需求并非单纯解题，而是深度巩固 SQL 语句知识，时刻维持对其的熟悉感。因此我们精心打造了丰富且系统的复习内容，涵盖了诸如“SQL 数据查询语句复习”、“SQL 数据插入关键要点回顾”、“SQL 数据更新语法精析”等热门且高搜索量的核心板块。无论您是初涉数据库领域、渴望扎实基础的新手，还是经验丰富、力求精益求精的专业人士，都能在这里找到精准适配的复习资源。
      </p>
      <p>
        与其他刷题网站不同，SQL Wizland 着重于语句本身的深度剖析与强化记忆。每一道复习题都经过精心设计与筛选，您可以针对主流数据库类型（比如 MySQL、SQL Server 和 Oracle）进行不同练习，确保您在复习过程中精准定位到与您实际工作或学习场景紧密相关的内容。独特的交互界面采用便捷的下拉列表形式，使您在复习过程中如同置身于一场趣味知识探索之旅，高效且愉悦地检验对 SQL 语句细节的精准把握。答题结束后，即时详尽的反馈机制不仅清晰呈现答对答错详情，更将错误选项重点标识，助您迅速锁定知识盲点，针对性强化薄弱环节，以最短的时间实现 SQL 语句掌握程度的质的飞跃。
      </p>
      <p>
        SQL Wizland 还提供便捷的分类导航，导航按照工作中的实际使用频率从高频到低频排序，您可依据自身需求灵活选择特定分类或随机开启复习之旅，无论是碎片化时间的快速回顾，还是系统全面的深度复习，都能随心所驭。凭借专业的内容、独特的复习模式以及对 SQL 语句复习的极致专注，SQL Wizland 致力于成为您 SQL 复习之路上最得力的伙伴，助力您在数据处理的广袤天地中自由驰骋，轻松应对各种复杂挑战，为您的职业发展与学术进阶筑牢坚实根基。
      </p>
      <h2>用户出题贡献通道</h2>
      <p>
        SQL Wizland 最骄傲的就是用户出题贡献通道。SQL Wizland 的用户既是使用者，也是创作者，您可以参与到网站的题目选择中来！
      </p>
      <p>
        如果有一些语句您经常混淆，想要练习，但这些语句并未被包含在网站的测试题库中，那么您可以自行制作题目，在Github中提出您的建议，我们会定期查看建议，如果您的建议通过审核，我们将会把它加入到题库中，让您和更多像您一样的用户受益。
      </p>
    `;
  statementDetailsDiv.appendChild(aboutDiv);
}

// 展示特定分类下的题目列表
function showQuestionsByCategory(categoryId) {
  console.log(categoryId)
  if(categoryId === 0){
    showAbout()
  } else{
    // const questions = getQuestionsByCategory(categoryId);
    const database = getSelectedDatabase();
    const questions = getQuestionsByDatabaseAndCategory(database, categoryId);
    const statementDetailsDiv = document.getElementById('statement-details');
    statementDetailsDiv.innerHTML = "";

    questions.forEach((question) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';
      questionDiv.innerHTML = `
        <span id="answer-span-${question.question_id}">
          ${question.question_text_before_options}
          <select id="answer-${question.question_id}">
            ${question.options.map((option) => `<option>${option}</option>`).join('')}
          </select>
          ${question.question_text_after_options}
        </span>
      `;
      statementDetailsDiv.appendChild(questionDiv);
    });
    const submitButton = document.createElement('button');
    submitButton.textContent = "提交答案";
    submitButton.addEventListener('click', () => checkAnswers(questions));
    statementDetailsDiv.appendChild(submitButton);
  }
  
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

// 检查答案
function checkAnswers(questions) {
  const resultDiv = document.getElementById('statement-details');
  let score = 0;
  questions.forEach((question) => {
    const selectedAnswer = document.getElementById(`answer-${question.question_id}`).value;
    if (selectedAnswer === question.correct_answer) {
      score++;
    }
  });
  resultDiv.innerHTML = `您答对了 ${score} 道题，共 ${questions.length} 道题。`;
}

window.onload = populate;