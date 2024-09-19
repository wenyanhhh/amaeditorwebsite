document.addEventListener('DOMContentLoaded', fetchAllApiData);

function fetchAllApiData() {
    const apiCalls = [
        { id: 'getd1retention', callType: 'getd1retention' },
        { id: 'getd7retention', callType: 'getd7retention' },
        { id: 'getd30retention', callType: 'getd30retention' },
        { id: 'getdmidtermretention', callType: 'get_mid_term_user_activity_rate' },
        { id: 'get_weekly_active_users', callType: 'get_weekly_active_users' },
        { id: 'get_onboarding_completion', callType: 'get_onboarding_completion' },
        { id: 'get_lesson_completion', callType: 'get_lesson_completion' },
        { id: 'get_episode_unlocks', callType: 'get_episode_unlocks' },
        { id: 'get_episode_talk_completion', callType: 'get_episode_talk_completion' },
        { id: 'get_news_details_clicked', callType: 'get_news_details_clicked' },
        { id: 'get_profile_tab_click_rate', callType: 'get_profile_tab_click_rate' },
        { id: 'get_news_tab_click_rate', callType: 'get_news_tab_click_rate' },
        { id: 'get_conversations_per_user_week', callType: 'get_conversations_per_user_week' },
        { id: 'get_storylines_added_per_user_week', callType: 'get_storylines_added_per_user_week' },
        { id: 'get_yesterday_new_users', callType: 'get_yesterday_new_users' },
        { id: 'get_churned_users', callType: 'get_churned_users' },
        { id: 'fetchdailyactiveusers', callType: 'fetchdailyactiveusers' },
        { id: 'fetchmonthlyactiveusers', callType: 'fetchmonthlyactiveusers' },
        { id: 'fetchd1retentionsummary', callType: 'fetchd1retentionsummary' },
        { id: 'fetchd7retentionsummary', callType: 'fetchd7retentionsummary' },
        { id: 'fetchd30retentionsummary', callType: 'fetchd30retentionsummary' },
        { id: 'fetchaverageactivedays7', callType: 'fetchaverageactivedays7' },
        { id: 'fetchaverageactivedays30', callType: 'fetchaverageactivedays30' },
        { id: 'fetchdailynewusersmetrics', callType: 'fetchdailynewusersmetrics' },
        { id: 'fetchweeklynewusersdata', callType: 'fetchweeklynewusersdata' },
        { id: 'fetchweeklyactivationmetrics', callType: 'fetchweeklyactivationmetrics' },
        { id: 'getd1retention30days', callType: 'getd1retention30days' },
        { id: 'getd7retention30days', callType: 'getd7retention30days' },
        { id: 'getd30retention30days', callType: 'getd30retention30days' }
    ];

    apiCalls.forEach(api => {
        fetchApiData(api.id, api.callType);
    });
}

function fetchApiData(id, callType) {
    const url = 'https://instancecaller.azurewebsites.net/api/practicecall';  // 你的后端 API URL

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Call-Type': callType  // 设置 Call-Type header
        }
    })
        .then(response => response.json())
        .then(data => {
            // 检查是否返回了字符串形式的 JSON
            if (typeof data === 'string') {
                data = JSON.parse(data);  // 将字符串解析为对象
            }
            displayData(id, data);
        })
        .catch(error => {
            console.error(`Error fetching data for ${callType}:`, error);
            document.getElementById(`${id}-result`).textContent = `Error: ${error.message}`;
        });
}


function displayData(id, data) {
    console.log(`Data for ${id}:`, data);  // 调试输出

    const columns = data.columns;
    const rows = data.data;

    if (!columns || !rows) {
        resultElement.innerHTML = `<p>No data available</p>`;
        return;
    }

    // 创建表格元素
    let tableHTML = '<table border="1"><thead><tr>';

    // 添加表头
    columns.forEach(column => {
        tableHTML += `<th>${column}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';

    // 添加表格数据
    rows.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    // 显示表格
    const resultElement = document.getElementById(`${id}-result`);
    resultElement.innerHTML = tableHTML;
}
