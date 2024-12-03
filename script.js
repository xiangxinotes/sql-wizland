var category_selected = false;
var selected_category_id;
var questions;

// 加载JSON categories.json文件中的分类数据
async function populate() {
    const requestURL = "json/categories.json"; //online 
    const request = new Request(requestURL);
    const response = await fetch(request);
    const categories = await response.json(); // 用于存储从JSON文件读取的分类数据
    categories.push({
        "category_id": 0,
        "category_name": "关于 SQL Wizland"
    });
    populateCategoryList(categories);
    populateIntroduction();
}

// 加载介绍信息到网站首页面
function populateIntroduction() {
    const statementDetailsDiv = document.getElementById('statement-details');
    statementDetailsDiv.innerHTML = `
        <div class="quick_start_container">
            <h1>还在为精准记忆 SQL 语句发愁？</h1>
            <p>传统学习方法总是学了就忘，不尽人意。</p>
            <p>SQL Wizland 提供针对性复习，助您轻松掌握 SQL！</p>
            <div class="quick-start-buttons">
                <div class="quick-start-button">
                    <h3>数据查询</h3>
                    <p>通用基础，关联万千，巩固提升</p>
                </div>
                <!-- <div class="quick-start-button">
                    <h3>数据插入</h3>
                    <p></p>
                </div>
                <div class="quick-start-button">
                    <h3>数据更新</h3>
                    <p></p>
                </div>
                <div class="quick-start-button">
                    <h3></h3>
                    <p></p>
                </div>
                <div class="quick-start-button">
                    <h3></h3>
                    <p></p>
                </div>
                <div class="quick-start-button">
                    <h3></h3>
                    <p></p>
                </div> -->
            </div>
        </div>
    `;
}

// 加载语句分类列表到页面
function populateCategoryList(obj) {
    const categoryListUl = document.getElementById('category-nav');
    const categoryListNav = document.querySelector('#category-list');
    const headerOverlayDiv = document.querySelector('.header__overlay');
    obj.forEach((category) => {
        categoryItem = document.createElement('li');
        categoryItem.classList.add('category-item');
        categoryItem.textContent = category.category_name;
        categoryItem.addEventListener('click', function () {
            categoryListNav.classList.remove('is-open');
            headerOverlayDiv.classList.remove('is-visible');
            const dbButtonsDiv = document.getElementById('database-buttons-container');
            dbButtonsDiv.style.display = "block";
            clearCategoryListActiveClass();
            this.classList.add('active');
            showQuestionsByCategory(category.category_id);
            selected_category_id = category.category_id;
        });
        // categoryListDiv.appendChild(categoryItem);
        categoryListUl.appendChild(categoryItem);
    });

    const navButtons = document.querySelector('.nav-buttons');
    navButtons.addEventListener('click', function(){
        categoryListNav.classList.add('is-open');
        headerOverlayDiv.classList.add('is-visible');
    });

    // const closeNavButton = document.querySelector('.close-nav-button');
    // closeNavButton.addEventListener('click', function(){
    //     categoryListNav.classList.remove('is-open');
    // });

    categoryListNav.addEventListener('click', function(){
        categoryListNav.classList.remove('is-open');
        headerOverlayDiv.classList.remove('is-visible');
    });

    headerOverlayDiv.addEventListener('click', function(){
        categoryListNav.classList.remove('is-open');
        headerOverlayDiv.classList.remove('is-visible');
    });

}

// 清除所有分类列表的选中状态（移除active类）
function clearCategoryListActiveClass() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((categoryItem) => {
        categoryItem.classList.remove('active');
    });
}

// 加载JSON questions.json文件中的问题数据
async function loadQuestions() {
    const requestURL = "json/questions.json"; //online
    const request = new Request(requestURL);
    const response = await fetch(request);
    const questions = await response.json(); // 用于存储从JSON文件读取的问题数据
    populateQuestions(questions);
}

// 加载问题到变量内
function populateQuestions(q) {
    questions = q;
}

function showAbout() {
    const dbButtonsDiv = document.getElementById('database-buttons-container');
    dbButtonsDiv.style.display = "none";
    const statementDetailsDiv = document.getElementById('statement-details');
    statementDetailsDiv.innerHTML = "";
    const aboutDiv = document.createElement('div');
    aboutDiv.classList.add('about');
    aboutDiv.innerHTML = `
        <h1>为什么选择 SQL Wizland？</h1>
        <h2>数据会说话</h2>
        <p>
            职友集数据显示，2024年 SQL开发工程师的市场需求较2023年同期对比<strong>增长486%</strong>。
            软件开发公司中66.7%的 SQL开发工程师岗位月薪15-30k，年薪18-36w，其工资待遇比软件开发公司平均工资<strong>高出23.7%</strong>。
            2024年CSDN对近1000万条招聘信息的调查结果显示，SQL占招聘职位的8.2%，在编程语言类招聘需求中排名<strong>超过</strong> C#等编程语言。
        </p>
        <p>这些数据告诉我们：掌握 SQL刻不容缓。</p>
        <h2>SQL Wizland的使命</h2>
        <p>
            如果您去搜索，您会发现市面上有很多刷题网站，这些刷题网站并不适合<strong>有解题逻辑但需加深 SQL语句印象的人</strong>。SQL Wizland了解这一痛苦，并因此应运而生。
        </p>
        <p>
            SQL Wizland和传统的刷题网站有鲜明的差异，SQL Wizland专注于 <strong>SQL语句复习</strong>领域。
        </p>
        <p>
            SQL Wizland专为有解题逻辑但需加深语句印象者打造，SQL Wizland深知您的需求并非单纯解题，而是深度巩固 SQL语句知识，时刻维持对其的熟悉感。因此我们精心打造了丰富且系统的复习内容，涵盖了诸如 “数据查询”、“数据插入”、“数据更新” 等热门且最常用的核心板块，完美适配新手与专业人士。
        </p>
        <p>
            您可针对 MySQL、SQL Server、Oracle等主流数据库进行专门练习，达到最佳复习效果。SQL Wizland交互界面便捷，包含分类导航，且分类导航按<strong>使用频率排序</strong>，让您关注最重要的内容。题目部分包含下拉列表与即时反馈，助您迅速锁定知识盲点，针对性强化薄弱环节，以最短的时间实现 SQL语句掌握程度的质的飞跃。
        </p>
        <p>
            SQL Wizland的每一套题用时短，让您可以在碎片化时间里进行系统复习，是您 SQL复习路上的好帮手。SQL Wizland将会让您驰骋数据处理领域，筑牢职业与学术根基。
        </p>
        <h2>用户出题</h2>
        <p>
            SQL Wizland最骄傲的就是用户出题贡献通道。SQL Wizland的用户既是使用者，也是创作者，您可以参与到网站的题目选择中来！
        </p>
        <p>
            如果有一些语句您经常混淆，想要练习，但这些语句并未被包含在网站的测试题库中，那么您可以自行制作题目，在<a href="https://github.com/xiangxinotes/sql-wizland" target="blank"><strong>Github中</strong></a>向我们提出您的建议，我们会定期查看建议，如果您的建议通过审核，我们将会把它加入到题库中，让您和更多像您一样的用户受益。
        </p>
    `;
    statementDetailsDiv.appendChild(aboutDiv);
}

// 展示特定分类下的题目列表
function showQuestionsByCategory(categoryId) {
    if (categoryId === 0) {
        showAbout()
    } else {
        const database = getSelectedDatabase();
        const questions = getQuestionsByDatabaseAndCategory(database, categoryId);
        const statementDetailsDiv = document.getElementById('statement-details');
        statementDetailsDiv.innerHTML = "";
        statementDetailsDiv.innerHTML = "<p>请从下拉列表中选出最适合填在挖空处的 SQL 语句。</p>";
        const questionOl = document.createElement('ol');
        questionOl.classList.add('question');
        questionOl.innerHTML = "";

        questions.forEach((question) => {
            questionOl.innerHTML += `
                <li id="answer-li-${question.question_id}">
                    ${question.question_text_before_options}
                    <select id="answer-${question.question_id}">
                    <option value="未填写">&nbsp;</option>
                        ${question.options.map((option) => `<option>${option}</option>`).join('')}
                    </select>
                    ${question.question_text_after_options}
                </li>
            `;
        });

        statementDetailsDiv.appendChild(questionOl);
        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-answer');
        submitButton.textContent = "提交答案";
        submitButton.addEventListener('click', () => checkAnswers(questions));
        statementDetailsDiv.appendChild(submitButton);
    }
}


// 根据选中的数据库和分类获取题目列表
function getQuestionsByDatabaseAndCategory(database, categoryId) {
    // const category = categories.find(c => c.category_id === categoryId);
    return questions.filter(q => q.applicable_databases.includes(database) && q.category_id === categoryId);
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

// 为数据库按钮添加点击事件处理函数
function setupDatabaseButtonClickHandlers() {
    const mysqlButton = document.getElementById('mysql-button');
    const sqlServerButton = document.getElementById('sql-server-button');
    const oracleButton = document.getElementById('oracle-button');

    mysqlButton.addEventListener('click', () => {
        clearDatabaseButtonActiveClass();
        mysqlButton.classList.add('active');
        if (selected_category_id) {
            showQuestionsByCategory(selected_category_id);
        }
    });

    sqlServerButton.addEventListener('click', () => {
        clearDatabaseButtonActiveClass();
        sqlServerButton.classList.add('active');
        if (selected_category_id) {
            showQuestionsByCategory(selected_category_id);
        }
    });

    oracleButton.addEventListener('click', () => {
        clearDatabaseButtonActiveClass();
        oracleButton.classList.add('active');
        if (selected_category_id) {
            showQuestionsByCategory(selected_category_id);
        }
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

// 检查答案
function checkAnswers(questions) {
    const submitButton = document.querySelector('.submit-answer');
    submitButton.style.display = 'none';
    const statementDetailsDiv = document.getElementById('statement-details');
    let score = 0;
    questions.forEach((question) => {
        const questionLi = document.getElementById(`answer-li-${question.question_id}`)
        const selectedAnswer = document.getElementById(`answer-${question.question_id}`).value;
        const questionLiSettings = [
            {
                class: "correct",
                emoji: "fa-check"
            },
            {
                class: "blank",
                emoji: "fa-minus-circle"
            },
            {
                class: "incorrect",
                emoji: "fa-times"
            }
        ]
        let number = 1;
        if (selectedAnswer === question.correct_answer) {
            score++;
            number = 0;
        } else if (selectedAnswer === '未填写') {
            number = 1;
        } else {
            number = 2;
        };

        questionLi.innerHTML = `
            ${question.question_text_before_options} 
            <span class="${questionLiSettings[number].class}"> 
                ${selectedAnswer} 
                <i class="fas ${questionLiSettings[number].emoji}"></i> 
            </span>
            ${question.question_text_after_options}
            <span class="tooltip tooltip-hidden tooltip-fa color_text">
              <i class="comment-icon far fa-question-circle"></i>
              <span class="tooltip-content">${question.question_comment}</span>
            </span>
            <span class="tooltip tooltip-hidden tooltip-fa color_text">
              <i class="comment-icon fas fa-info-circle"></i>
              <span class="tooltip-content">${question.knowledge_comment}</span>
            </span>
        `;
    });

    const resultFooter = document.createElement('div');
    resultFooter.classList.add("feedback");
    const correctStars = Math.round(score / questions.length * 5);

    function ligentenStars(n){
        const lightenStars = new Array(n+1).join(`<i class="fas fa-star"></i>`);
        const darkenStars = new Array(5-n+1).join(`<i class="far fa-star"></i>`);
        return lightenStars + darkenStars;
    }

    resultFooter.innerHTML = `
        <h2 class="question-result">结果
            <span class="star">
                ${ligentenStars(correctStars)}
            </span>
        </h2>
        <p>您答对了 ${score} / ${questions.length} 道题。正确率：${Math.round(score / questions.length * 100)} %</p>`;

    statementDetailsDiv.appendChild(resultFooter);
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip) => {
        tooltip.classList.remove("tooltip-hidden");
      // 绑定鼠标悬停事件，显示知识解释提示框
      tooltip.addEventListener('mouseover', function () {
        const tooltipContent = tooltip.querySelector('.tooltip-content');
        // 设置提示框为绝对定位，根据图标位置设置合适的显示位置
        tooltipContent.classList.add("tootip-content-show");
        tooltipContent.style.top = (this.offsetTop + this.offsetHeight + 5) + 'px';
        tooltipContent.style.left = (this.offsetLeft - tooltipContent.offsetWidth / 2) + 'px';
      });

      // 绑定鼠标移出事件，移除提示框
      tooltip.addEventListener('mouseout', function () {
        const tooltipContent = tooltip.querySelector('.tooltip-content');
        tooltipContent.classList.remove("tootip-content-show");
      });
    });
}

window.onload = function () {
    populate();
    loadQuestions();
    setupDatabaseButtonClickHandlers();
};