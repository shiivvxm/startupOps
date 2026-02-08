// ============================================
// STATE & STORAGE MANAGEMENT
// ============================================

console.log('StartupOps JavaScript loaded successfully!');

/**
 * Initialize demo users in localStorage
 */
function initializeUsers() {
    const demoUsers = [
        {
            name: 'Admin User',
            email: 'admin@test.com',
            username: 'admin',
            password: 'admin123',
            role: 'founder'
        },
        {
            name: 'Team Member',
            email: 'member@test.com',
            username: 'member',
            password: 'member123',
            role: 'team'
        },
        {
            name: 'Mentor User',
            email: 'mentor@test.com',
            username: 'mentor',
            password: 'mentor123',
            role: 'mentor'
        },
        {
            name: 'Investor User',
            email: 'investor@test.com',
            username: 'investor',
            password: 'investor123',
            role: 'investor'
        }
    ];

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(demoUsers));
    }
}

/**
 * Initialize startup data
 */
function initializeStartupData() {
    console.log('Startup data will be created during onboarding');
}

/**
 * Initialize tasks in localStorage
 */
function initializeTasks() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
}

/**
 * Initialize feedback in localStorage
 */
function initializeFeedback() {
    if (!localStorage.getItem('feedback')) {
        localStorage.setItem('feedback', JSON.stringify([]));
    }
}

/**
 * Initialize team members in localStorage
 */
function initializeTeamMembers() {
    if (!localStorage.getItem('teamMembers')) {
        localStorage.setItem('teamMembers', JSON.stringify([]));
    }
}

/**
 * Initialize subscription in localStorage
 */
function initializeSubscription() {
    if (!localStorage.getItem('subscription')) {
        localStorage.setItem('subscription', JSON.stringify({ plan: 'free' }));
    }
}

// ============================================
// NAVIGATION & PAGE SWITCHING
// ============================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showLanding() {
    showPage('landingPage');
}

function showLogin() {
    showPage('loginPage');
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
    }
}

function showSignup() {
    showPage('signupPage');
    const errorDiv = document.getElementById('signupError');
    const successDiv = document.getElementById('signupSuccess');
    if (errorDiv) errorDiv.classList.add('hidden');
    if (successDiv) successDiv.classList.add('hidden');
}

function showFounderSection(section, el) {
    document.querySelectorAll('.sidebar-item').forEach(item =>
        item.classList.remove('active')
    );

    if (el) el.classList.add('active');

    document.querySelectorAll('.founder-section').forEach(sec =>
        sec.style.display = 'none'
    );

    const map = {
        overview: 'founderOverview',
        manage: 'founderManage',
        team: 'founderTeam',
        tasks: 'founderTasks',
        teamoverview: 'founderTeamoverview',
        analytics: 'founderAnalytics',
        feedback: 'founderFeedback',
        investor: 'founderInvestor',
        subscription: 'founderSubscription',
        settings: 'founderSettings'
    };

    const titleMap = {
        overview: 'Dashboard Overview',
        manage: 'Manage Startup',
        team: 'Team Management',
        tasks: 'Task Management',
        teamoverview: 'Team Overview',
        analytics: 'Analytics & Insights',
        feedback: 'Feedback & Decisions',
        investor: 'Investor Preview',
        subscription: 'Subscription',
        settings: 'Settings'
    };

    document.getElementById(map[section]).style.display = 'block';
    document.getElementById('sectionTitle').textContent = titleMap[section];
    
    // Load data based on section
    if (section === 'tasks') {
        loadFounderTasks();
    } else if (section === 'teamoverview') {
        updateTeamOverview();
    } else if (section === 'feedback') {
        loadFounderFeedback();
    } else if (section === 'team') {
        loadTeamMembers();
    } else if (section === 'overview') {
        updateFounderOverviewStats();
    } else if (section === 'investor') {
        updateFounderInvestorView();
    }
}

function showTeamSection(section, el) {
    document.querySelectorAll('.sidebar-item').forEach(item =>
        item.classList.remove('active')
    );

    if (el) el.classList.add('active');

    document.querySelectorAll('.team-section').forEach(sec =>
        sec.style.display = 'none'
    );

    const map = {
        tasks: 'teamTasks',
        overview: 'teamOverview',
        subscription: 'teamSubscription',
        settings: 'teamSettings'
    };

    const titleMap = {
        tasks: 'My Tasks',
        overview: 'Team Overview',
        subscription: 'Subscription',
        settings: 'Settings'
    };

    document.getElementById(map[section]).style.display = 'block';
    document.getElementById('teamSectionTitle').textContent = titleMap[section];

    if (section === 'tasks') {
        loadTeamMemberTasks();
        loadTeamFeedback();
    } else if (section === 'overview') {
        updateTeamOverviewSection();
    }
}

function showMentorSection(section, el) {
    document.querySelectorAll('.sidebar-item').forEach(item =>
        item.classList.remove('active')
    );

    if (el) el.classList.add('active');

    document.querySelectorAll('.mentor-section').forEach(sec =>
        sec.style.display = 'none'
    );

    const map = {
        analytics: 'mentorAnalytics',
        feedback: 'mentorFeedback',
        tasks: 'mentorTasks',
        subscription: 'mentorSubscription',
        settings: 'mentorSettings'
    };

    const titleMap = {
        analytics: 'Startup Analytics',
        feedback: 'Submit Feedback',
        tasks: 'View Tasks',
        subscription: 'Subscription',
        settings: 'Settings'
    };

    document.getElementById(map[section]).style.display = 'block';
    document.getElementById('mentorSectionTitle').textContent = titleMap[section];

    if (section === 'analytics') {
        loadMentorAnalytics();
    } else if (section === 'feedback') {
        loadMentorFeedbackHistory();
    } else if (section === 'tasks') {
        loadMentorTasks();
    }
}

function showInvestorSection(section, el) {
    if (el) {
        document.querySelectorAll('#investorDashboard .sidebar-item').forEach(item =>
            item.classList.remove('active')
        );
        el.classList.add('active');
    }

    document.querySelectorAll('.investor-section').forEach(sec =>
        sec.style.display = 'none'
    );

    const map = {
        teams: 'investorTeams',
        teamDetail: 'investorTeamDetail',
        metrics: 'investorMetrics',
        pitch: 'investorPitch',
        subscription: 'investorSubscription'
    };

    const titleMap = {
        teams: 'Investment Opportunities',
        teamDetail: 'Team Details',
        metrics: 'Metrics',
        pitch: 'Pitch',
        subscription: 'Subscription'
    };

    const sectionId = map[section];
    if (sectionId) {
        document.getElementById(sectionId).style.display = 'block';
        document.getElementById('investorSectionTitle').textContent = titleMap[section];
    }

    if (section === 'teams') {
        loadInvestorTeams();
        document.getElementById('teamDetailNav').style.display = 'none';
    }
}

// ============================================
// AUTHENTICATION SYSTEM
// ============================================

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (user && user.role !== role) {
        document.getElementById('loginError').textContent =
            `You are registered as ${user.role}. Please select correct role.`;
        document.getElementById('loginError').classList.remove('hidden');
        return;
    }
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        switch(role) {
            case 'founder':
            case 'cofounder':
                const startupData = localStorage.getItem('startupData');
                if (!startupData || !JSON.parse(startupData).created) {
                    showPage('onboardingPage');
                } else {
                    showPage('founderDashboard');
                    updateFounderDashboard();
                    updateNotificationBadge();
                }
                break;
            case 'team':
                showPage('teamDashboard');
                updateTeamDashboard();
                updateNotificationBadge();
                break;
            case 'mentor':
                showPage('mentorDashboard');
                updateMentorDashboard();
                break;
            case 'investor':
                showPage('investorDashboard');
                updateInvestorDashboard();
                break;
        }
        
        document.getElementById('loginForm').reset();
    } else {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = 'Invalid credentials. Please check username, password, and role.';
            errorDiv.classList.remove('hidden');
        }
    }
    
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const role = document.getElementById('signupRole').value;
    
    const errorDiv = document.getElementById('signupError');
    const successDiv = document.getElementById('signupSuccess');
    
    if (errorDiv) errorDiv.classList.add('hidden');
    if (successDiv) successDiv.classList.add('hidden');
    
    if (password !== confirmPassword) {
        if (errorDiv) {
            errorDiv.textContent = 'Passwords do not match. Please try again.';
            errorDiv.classList.remove('hidden');
        }
        return false;
    }
    
    if (password.length < 6) {
        if (errorDiv) {
            errorDiv.textContent = 'Password must be at least 6 characters long.';
            errorDiv.classList.remove('hidden');
        }
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const usernameExists = users.some(u => u.username === username);
    if (usernameExists) {
        if (errorDiv) {
            errorDiv.textContent = 'Username already exists. Please choose a different username.';
            errorDiv.classList.remove('hidden');
        }
        return false;
    }
    
    const emailExists = users.some(u => u.email === email);
    if (emailExists) {
        if (errorDiv) {
            errorDiv.textContent = 'Email already registered. Please use a different email or login.';
            errorDiv.classList.remove('hidden');
        }
        return false;
    }
    
    const newUser = {
        name: name,
        email: email,
        username: username,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    if (successDiv) {
        successDiv.textContent = 'Account created successfully! Redirecting to login...';
        successDiv.classList.remove('hidden');
    }
    
    document.getElementById('signupForm').reset();
    
    setTimeout(() => {
        showLogin();
    }, 2000);
    
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    showLanding();
}

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        
        switch(user.role) {
            case 'founder':
            case 'cofounder':
                const startupData = localStorage.getItem('startupData');
                if (!startupData || !JSON.parse(startupData).created) {
                    showPage('onboardingPage');
                } else {
                    showPage('founderDashboard');
                    updateFounderDashboard();
                    updateNotificationBadge();
                }
                break;
            case 'team':
                showPage('teamDashboard');
                updateTeamDashboard();
                updateNotificationBadge();
                break;
            case 'mentor':
                showPage('mentorDashboard');
                updateMentorDashboard();
                break;
            case 'investor':
                showPage('investorDashboard');
                updateInvestorDashboard();
                break;
        }
    }
}

// ============================================
// MODAL SYSTEM
// ============================================

function showModal(title, message, type = 'info', callback = null) {
    const overlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    const modalButton = document.getElementById('modalButton');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalContent.innerHTML = '';
    
    const iconConfig = {
        success: { icon: '✓', bg: '#dcfce7', color: '#16a34a' },
        error: { icon: '✕', bg: '#fee2e2', color: '#dc2626' },
        info: { icon: 'ℹ', bg: '#dbeafe', color: '#2563eb' },
        warning: { icon: '⚠', bg: '#fef3c7', color: '#f59e0b' }
    };
    
    const config = iconConfig[type] || iconConfig.info;
    modalIcon.textContent = config.icon;
    modalIcon.style.backgroundColor = config.bg;
    modalIcon.style.color = config.color;
    
    overlay.classList.add('show');
    
    modalButton.onclick = () => {
        overlay.classList.remove('show');
        if (callback) callback();
    };
}

function hideModal() {
    document.getElementById('modalOverlay').classList.remove('show');
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function updateNotificationBadge() {
    const feedback = getFeedback();
    const unreadCount = feedback.filter(f => !f.read).length;
    
    const founderBadge = document.getElementById('founderNotificationBadge');
    const teamBadge = document.getElementById('teamNotificationBadge');
    
    if (founderBadge) {
        if (unreadCount > 0) {
            founderBadge.textContent = unreadCount;
            founderBadge.style.display = 'flex';
        } else {
            founderBadge.style.display = 'none';
        }
    }
    
    if (teamBadge) {
        if (unreadCount > 0) {
            teamBadge.textContent = unreadCount;
            teamBadge.style.display = 'flex';
        } else {
            teamBadge.style.display = 'none';
        }
    }
}

function showNotifications() {
    const feedback = getFeedback();
    const unreadFeedback = feedback.filter(f => !f.read);
    
    if (unreadFeedback.length === 0) {
        showModal('Notifications', 'No new notifications', 'info');
        return;
    }
    
    const overlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    const modalButton = document.getElementById('modalButton');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = 'New Feedback Notifications';
    modalMessage.textContent = `You have ${unreadFeedback.length} new feedback message(s)`;
    
    modalIcon.textContent = '🔔';
    modalIcon.style.backgroundColor = '#dbeafe';
    modalIcon.style.color = '#2563eb';
    
    let contentHTML = '<div class="space-y-3 text-left">';
    unreadFeedback.forEach(fb => {
        contentHTML += `
            <div class="feedback-item">
                <p class="font-medium text-sm">${fb.title}</p>
                <p class="text-xs text-gray-600 mt-1">${fb.content}</p>
                <p class="text-xs text-gray-500 mt-2">From: ${fb.mentorName} • ${new Date(fb.createdAt).toLocaleDateString()}</p>
            </div>
        `;
    });
    contentHTML += '</div>';
    
    modalContent.innerHTML = contentHTML;
    
    overlay.classList.add('show');
    
    modalButton.onclick = () => {
        markAllFeedbackAsRead();
        overlay.classList.remove('show');
        updateNotificationBadge();
    };
}

function markAllFeedbackAsRead() {
    const feedback = getFeedback();
    feedback.forEach(f => f.read = true);
    saveFeedback(feedback);
}

// ============================================
// ONBOARDING FUNCTIONS
// ============================================

function goToOnboardingStep2() {
    const startupName = document.getElementById('onboardingStartupName').value.trim();
    
    if (!startupName) {
        showModal('Name Required', 'Please enter your startup or team name to continue.', 'warning');
        return;
    }
    
    if (startupName.length < 2) {
        showModal('Invalid Name', 'Startup name must be at least 2 characters long.', 'warning');
        return;
    }
    
    document.getElementById('step1Indicator').classList.remove('bg-emerald-600', 'text-white');
    document.getElementById('step1Indicator').classList.add('bg-green-500', 'text-white');
    document.getElementById('progressLine').classList.remove('bg-gray-200');
    document.getElementById('progressLine').classList.add('bg-emerald-600');
    document.getElementById('step2Indicator').classList.remove('bg-gray-200', 'text-gray-500');
    document.getElementById('step2Indicator').classList.add('bg-emerald-600', 'text-white');
    
    document.getElementById('onboardingStep1').style.display = 'none';
    document.getElementById('onboardingStep2').style.display = 'block';
}

function goBackToStep1() {
    document.getElementById('step1Indicator').classList.remove('bg-green-500');
    document.getElementById('step1Indicator').classList.add('bg-emerald-600', 'text-white');
    document.getElementById('progressLine').classList.remove('bg-emerald-600');
    document.getElementById('progressLine').classList.add('bg-gray-200');
    document.getElementById('step2Indicator').classList.remove('bg-emerald-600', 'text-white');
    document.getElementById('step2Indicator').classList.add('bg-gray-200', 'text-gray-500');
    
    document.getElementById('onboardingStep2').style.display = 'none';
    document.getElementById('onboardingStep1').style.display = 'block';
}

function completeOnboarding() {
    const startupName = document.getElementById('onboardingStartupName').value.trim();
    const startupVision = document.getElementById('onboardingStartupVision').value.trim();
    
    if (!startupVision) {
        showModal('Vision Required', 'Please enter your startup vision to complete setup.', 'warning');
        return;
    }
    
    if (startupVision.length < 10) {
        showModal('Vision Too Short', 'Please provide a more detailed vision statement (at least 10 characters).', 'warning');
        return;
    }
    
    const startupData = {
        created: true,
        name: startupName,
        vision: startupVision,
        stage: 'Idea',
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('startupData', JSON.stringify(startupData));
    
    showModal(
        'Setup Complete!',
        'Your startup profile has been created successfully. Welcome to StartupOps!',
        'success',
        () => {
            showPage('founderDashboard');
            updateFounderDashboard();
        }
    );
}

// ============================================
// DASHBOARD UPDATE FUNCTIONS
// ============================================

function updateFounderDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const startup = JSON.parse(localStorage.getItem('startupData'));
    
    const currentUserDisplay = document.getElementById('currentUserDisplay');
    const founderName = document.getElementById('founderName');
    
    if (currentUserDisplay && user) {
        currentUserDisplay.textContent = user.username;
    }
    
    if (founderName && user) {
        founderName.textContent = user.username;
    }
    
    if (startup) {
        const startupNameDisplay = document.getElementById('startupNameDisplay');
        const startupStageDisplay = document.getElementById('startupStageDisplay');
        const startupVisionDisplay = document.getElementById('startupVisionDisplay');
        
        if (startupNameDisplay) {
            startupNameDisplay.textContent = startup.name;
        }
        
        if (startupStageDisplay) {
            startupStageDisplay.textContent = startup.stage;
        }
        
        if (startupVisionDisplay) {
            startupVisionDisplay.textContent = startup.vision;
        }
        
        const editStartupName = document.getElementById('editStartupName');
        const editStartupStage = document.getElementById('editStartupStage');
        const editStartupVision = document.getElementById('editStartupVision');
        
        if (editStartupName) {
            editStartupName.value = startup.name;
        }
        
        if (editStartupStage) {
            editStartupStage.value = startup.stage;
        }
        
        if (editStartupVision) {
            editStartupVision.value = startup.vision;
        }
    }
    
    loadFounderTasks();
    updateTeamOverview();
    loadFounderFeedback();
    loadTeamMembers();
    updateFounderOverviewStats();
}

function updateFounderOverviewStats() {
    const teamMembers = getTeamMembers();
    const tasks = getTasks();
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    
    const teamCountEl = document.getElementById('founderTeamCount');
    const activeTasksEl = document.getElementById('founderActiveTasks');
    const completedTasksEl = document.getElementById('founderCompletedTasks');
    
    if (teamCountEl) teamCountEl.textContent = teamMembers.length;
    if (activeTasksEl) activeTasksEl.textContent = tasks.length;
    if (completedTasksEl) completedTasksEl.textContent = completedTasks;
}

function updateFounderInvestorView() {
    const teamMembers = getTeamMembers();
    const teamSizeEl = document.getElementById('founderInvestorTeamSize');
    if (teamSizeEl) teamSizeEl.textContent = teamMembers.length;
}

function updateTeamDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const teamUserDisplay = document.getElementById('teamUserDisplay');
    
    if (teamUserDisplay && user) {
        teamUserDisplay.textContent = user.username;
    }
    
    loadTeamMemberTasks();
    loadTeamFeedback();
    updateTeamOverviewSection();
}

function updateTeamOverviewSection() {
    const teamMembers = getTeamMembers();
    const teamCountEl = document.getElementById('teamOverviewCount');
    if (teamCountEl) teamCountEl.textContent = teamMembers.length;
}

function updateMentorDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const mentorUserDisplay = document.getElementById('mentorUserDisplay');
    
    if (mentorUserDisplay && user) {
        mentorUserDisplay.textContent = user.username;
    }
    
    loadMentorAnalytics();
    loadMentorFeedbackHistory();
}

function updateInvestorDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const investorUserDisplay = document.getElementById('investorUserDisplay');
    
    if (investorUserDisplay && user) {
        investorUserDisplay.textContent = user.username;
    }
    
    loadInvestorTeams();
}

// ============================================
// FORM HANDLERS
// ============================================

function updateStartup(event) {
    event.preventDefault();
    
    const startupData = {
        created: true,
        name: document.getElementById('editStartupName').value,
        stage: document.getElementById('editStartupStage').value,
        vision: document.getElementById('editStartupVision').value,
        createdAt: JSON.parse(localStorage.getItem('startupData')).createdAt
    };
    
    localStorage.setItem('startupData', JSON.stringify(startupData));
    
    const startupNameDisplay = document.getElementById('startupNameDisplay');
    const startupStageDisplay = document.getElementById('startupStageDisplay');
    const startupVisionDisplay = document.getElementById('startupVisionDisplay');
    
    if (startupNameDisplay) {
        startupNameDisplay.textContent = startupData.name;
    }
    
    if (startupStageDisplay) {
        startupStageDisplay.textContent = startupData.stage;
    }
    
    if (startupVisionDisplay) {
        startupVisionDisplay.textContent = startupData.vision;
    }
    
    showModal('Success!', 'Startup details updated successfully!', 'success');
}

function acceptFeedback() {
    showModal('Task Created!', 'Feedback converted to task and added to your task list!', 'success');
}

// ============================================
// TASK MANAGEMENT SYSTEM
// ============================================

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addNewTask(event) {
    event.preventDefault();
    
    const title = document.getElementById('newTaskTitle').value.trim();
    const assignee = document.getElementById('newTaskAssignee').value;
    const dueDate = document.getElementById('newTaskDueDate').value;
    
    if (!title || !assignee || !dueDate) {
        showModal('Error', 'Please fill in all fields', 'error');
        return;
    }
    
    const tasks = getTasks();
    
    const newTask = {
        id: Date.now().toString(),
        title: title,
        assignee: assignee,
        dueDate: dueDate,
        status: 'Pending',
        createdBy: getCurrentUser().username,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks(tasks);
    
    showModal('Success!', 'Task added successfully!', 'success', () => {
        document.getElementById('newTaskTitle').value = '';
        document.getElementById('newTaskAssignee').value = '';
        document.getElementById('newTaskDueDate').value = '';
        loadFounderTasks();
        updateTeamOverview();
        updateFounderOverviewStats();
    });
}

function deleteTask(taskId) {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    saveTasks(filteredTasks);
    
    showModal('Deleted', 'Task deleted successfully!', 'success', () => {
        loadFounderTasks();
        updateTeamOverview();
        updateFounderOverviewStats();
    });
}

function updateTaskStatus(taskId, newStatus) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.status = newStatus;
        task.updatedAt = new Date().toISOString();
        saveTasks(tasks);
        
        showModal('Updated!', 'Task status updated successfully!', 'success', () => {
            loadTeamMemberTasks();
        });
    }
}

function loadFounderTasks() {
    const tasks = getTasks();
    const tasksList = document.getElementById('founderTasksList');
    const noTasksMsg = document.getElementById('noTasksMessage');
    
    if (!tasksList) return;
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '';
        if (noTasksMsg) noTasksMsg.style.display = 'block';
        return;
    }
    
    if (noTasksMsg) noTasksMsg.style.display = 'none';
    
    tasksList.innerHTML = tasks.map(task => {
        const statusColors = {
            'Pending': 'badge-gray',
            'In Progress': 'badge-blue',
            'Completed': 'badge-green'
        };
        
        return `
            <div class="task-card">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <p class="font-medium mb-1">${task.title}</p>
                        <div class="flex items-center gap-3 text-sm text-gray-500">
                            <span>👤 ${task.assignee === 'team' ? 'Team Member' : 'Co-Founder'}</span>
                            <span>📅 ${new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="badge ${statusColors[task.status]}">${task.status}</span>
                        <button onclick="deleteTask('${task.id}')" class="delete-btn text-red-600 hover:text-red-800 font-medium text-sm px-2" title="Delete task">
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadTeamMemberTasks() {
    const tasks = getTasks();
    const myTasks = tasks.filter(t => t.assignee === 'team');
    
    const tasksList = document.getElementById('teamMemberTasksList');
    const noTasksMsg = document.getElementById('noTeamTasksMessage');
    const totalTasksEl = document.getElementById('teamTotalTasks');
    const completedTasksEl = document.getElementById('teamCompletedTasks');
    const inProgressTasksEl = document.getElementById('teamInProgressTasks');
    const progressPercentEl = document.getElementById('teamProgressPercent');
    const progressBarEl = document.getElementById('teamProgressBar');
    
    if (!tasksList) return;
    
    if (myTasks.length === 0) {
        tasksList.innerHTML = '';
        if (noTasksMsg) noTasksMsg.style.display = 'block';
        return;
    }
    
    if (noTasksMsg) noTasksMsg.style.display = 'none';
    
    const completedCount = myTasks.filter(t => t.status === 'Completed').length;
    const inProgressCount = myTasks.filter(t => t.status === 'In Progress').length;
    const progressPercent = myTasks.length > 0 ? Math.round((completedCount / myTasks.length) * 100) : 0;
    
    if (totalTasksEl) totalTasksEl.textContent = myTasks.length;
    if (completedTasksEl) completedTasksEl.textContent = completedCount;
    if (inProgressTasksEl) inProgressTasksEl.textContent = inProgressCount;
    if (progressPercentEl) progressPercentEl.textContent = progressPercent + '%';
    if (progressBarEl) progressBarEl.style.width = progressPercent + '%';
    
    tasksList.innerHTML = myTasks.map(task => {
        return `
            <div class="task-card">
                <div class="mb-3">
                    <p class="font-medium mb-2">${task.title}</p>
                    <p class="text-sm text-gray-500">📅 Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                
                <div class="flex items-center gap-3">
                    <select 
                        id="status-${task.id}" 
                        class="input-field text-sm flex-1" 
                        style="padding: 0.5rem;">
                        <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                    
                    <button 
                        onclick="submitTaskStatus('${task.id}')" 
                        class="btn-primary text-sm px-4 py-2"
                        style="white-space: nowrap;">
                        Submit
                    </button>
                </div>
                
                ${task.status !== 'Pending' ? `
                    <div class="mt-2 text-sm text-gray-600">
                        Current Status: <span class="font-medium text-${task.status === 'Completed' ? 'green' : 'blue'}-600">${task.status}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function submitTaskStatus(taskId) {
    const selectElement = document.getElementById(`status-${taskId}`);
    if (!selectElement) return;
    
    const newStatus = selectElement.value;
    updateTaskStatus(taskId, newStatus);
}

function updateTeamOverview() {
    const tasks = getTasks();
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const totalEl = document.getElementById('totalTasksCount');
    const completedEl = document.getElementById('completedTasksCount');
    const progressEl = document.getElementById('overallProgressPercent');
    
    if (totalEl) totalEl.textContent = totalTasks;
    if (completedEl) completedEl.textContent = completedTasks;
    if (progressEl) progressEl.textContent = overallProgress + '%';
    
    const progressFill = document.getElementById('teamProgressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) progressFill.style.width = overallProgress + '%';
    if (progressText) progressText.textContent = overallProgress + '%';
    
    const pendingCountEl = document.getElementById('pendingCount');
    const inProgressCountEl = document.getElementById('inProgressCountOverview');
    const completedCountEl = document.getElementById('completedCountOverview');
    
    if (pendingCountEl) pendingCountEl.textContent = pendingTasks;
    if (inProgressCountEl) inProgressCountEl.textContent = inProgressTasks;
    if (completedCountEl) completedCountEl.textContent = completedTasks;
    
    const pendingBar = document.getElementById('pendingBar');
    const inProgressBar = document.getElementById('inProgressBar');
    const completedBar = document.getElementById('completedBar');
    
    if (totalTasks > 0) {
        if (pendingBar) pendingBar.style.width = ((pendingTasks / totalTasks) * 100) + '%';
        if (inProgressBar) inProgressBar.style.width = ((inProgressTasks / totalTasks) * 100) + '%';
        if (completedBar) completedBar.style.width = ((completedTasks / totalTasks) * 100) + '%';
    }
}

// ============================================
// FEEDBACK MANAGEMENT SYSTEM
// ============================================

function getFeedback() {
    return JSON.parse(localStorage.getItem('feedback') || '[]');
}

function saveFeedback(feedback) {
    localStorage.setItem('feedback', JSON.stringify(feedback));
}

function submitMentorFeedback(event) {
    event.preventDefault();
    
    const title = document.getElementById('feedbackTitle').value.trim();
    const content = document.getElementById('feedbackContent').value.trim();
    const user = getCurrentUser();
    
    if (!title || !content) {
        showModal('Error', 'Please fill in all fields', 'error');
        return;
    }
    
    const feedback = getFeedback();
    
    const newFeedback = {
        id: Date.now().toString(),
        title: title,
        content: content,
        mentorName: user.name,
        mentorUsername: user.username,
        createdAt: new Date().toISOString(),
        read: false
    };
    
    feedback.push(newFeedback);
    saveFeedback(feedback);
    
    showModal('Success!', 'Feedback submitted successfully!', 'success', () => {
        document.getElementById('feedbackTitle').value = '';
        document.getElementById('feedbackContent').value = '';
        loadMentorFeedbackHistory();
    });
}

function loadMentorFeedbackHistory() {
    const feedback = getFeedback();
    const user = getCurrentUser();
    const myFeedback = feedback.filter(f => f.mentorUsername === user.username);
    
    const historyList = document.getElementById('mentorFeedbackHistory');
    const noFeedbackMsg = document.getElementById('noMentorFeedbackHistory');
    
    if (!historyList) return;
    
    if (myFeedback.length === 0) {
        historyList.innerHTML = '';
        if (noFeedbackMsg) noFeedbackMsg.style.display = 'block';
        return;
    }
    
    if (noFeedbackMsg) noFeedbackMsg.style.display = 'none';
    
    historyList.innerHTML = myFeedback.map(fb => {
        return `
            <div class="feedback-item">
                <p class="font-medium text-sm">${fb.title}</p>
                <p class="text-xs text-gray-600 mt-1">${fb.content}</p>
                <p class="text-xs text-gray-500 mt-2">Submitted: ${new Date(fb.createdAt).toLocaleDateString()} • Status: ${fb.read ? 'Read' : 'Unread'}</p>
            </div>
        `;
    }).join('');
}

function loadFounderFeedback() {
    const feedback = getFeedback();
    const feedbackList = document.getElementById('founderFeedbackList');
    const noFeedbackMsg = document.getElementById('noFeedbackMessage');
    
    if (!feedbackList) return;
    
    if (feedback.length === 0) {
        feedbackList.innerHTML = '';
        if (noFeedbackMsg) noFeedbackMsg.style.display = 'block';
        return;
    }
    
    if (noFeedbackMsg) noFeedbackMsg.style.display = 'none';
    
    feedbackList.innerHTML = feedback.map(fb => {
        return `
            <div class="feedback-item">
                <div class="flex justify-between items-start mb-2">
                    <p class="font-medium">${fb.title}</p>
                    <span class="badge ${fb.read ? 'badge-gray' : 'badge-blue'}">${fb.read ? 'Read' : 'New'}</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">${fb.content}</p>
                <p class="text-xs text-gray-500">From: ${fb.mentorName} • ${new Date(fb.createdAt).toLocaleDateString()}</p>
            </div>
        `;
    }).join('');
}

function loadTeamFeedback() {
    const feedback = getFeedback();
    const feedbackList = document.getElementById('teamFeedbackList');
    const noFeedbackMsg = document.getElementById('noTeamFeedbackMessage');
    
    if (!feedbackList) return;
    
    if (feedback.length === 0) {
        feedbackList.innerHTML = '';
        if (noFeedbackMsg) noFeedbackMsg.style.display = 'block';
        return;
    }
    
    if (noFeedbackMsg) noFeedbackMsg.style.display = 'none';
    
    feedbackList.innerHTML = feedback.map(fb => {
        return `
            <div class="feedback-item">
                <div class="flex justify-between items-start mb-2">
                    <p class="font-medium">${fb.title}</p>
                    <span class="badge ${fb.read ? 'badge-gray' : 'badge-blue'}">${fb.read ? 'Read' : 'New'}</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">${fb.content}</p>
                <p class="text-xs text-gray-500">From: ${fb.mentorName} • ${new Date(fb.createdAt).toLocaleDateString()}</p>
            </div>
        `;
    }).join('');
}

// ============================================
// TEAM MEMBER MANAGEMENT
// ============================================

function getTeamMembers() {
    return JSON.parse(localStorage.getItem('teamMembers') || '[]');
}

function saveTeamMembers(members) {
    localStorage.setItem('teamMembers', JSON.stringify(members));
}

function addTeamMember(event) {
    event.preventDefault();
    
    const name = document.getElementById('teamMemberName').value.trim();
    const email = document.getElementById('teamMemberEmail').value.trim();
    const role = document.getElementById('teamMemberRole').value;
    
    if (!name || !email || !role) {
        showModal('Error', 'Please fill in all fields', 'error');
        return;
    }
    
    const members = getTeamMembers();
    
    const newMember = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: role,
        addedAt: new Date().toISOString()
    };
    
    members.push(newMember);
    saveTeamMembers(members);
    
    showModal('Success!', 'Team member added successfully!', 'success', () => {
        document.getElementById('teamMemberName').value = '';
        document.getElementById('teamMemberEmail').value = '';
        document.getElementById('teamMemberRole').value = 'team';
        loadTeamMembers();
        updateFounderOverviewStats();
        updateFounderInvestorView();
    });
}

function removeTeamMember(memberId) {
    const members = getTeamMembers();
    const filteredMembers = members.filter(m => m.id !== memberId);
    saveTeamMembers(filteredMembers);
    
    showModal('Removed', 'Team member removed successfully!', 'success', () => {
        loadTeamMembers();
        updateFounderOverviewStats();
        updateFounderInvestorView();
    });
}

function loadTeamMembers() {
    const members = getTeamMembers();
    const membersList = document.getElementById('teamMembersList');
    
    if (!membersList) return;
    
    if (members.length === 0) {
        membersList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <p class="text-sm">No team members added yet</p>
            </div>
        `;
        return;
    }
    
    membersList.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${members.map(member => `
                    <tr>
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td><span class="badge badge-blue">${member.role}</span></td>
                        <td>
                            <button onclick="removeTeamMember('${member.id}')" class="text-sm text-red-600 hover:text-red-800">
                                Remove
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ============================================
// MENTOR ANALYTICS
// ============================================

function loadMentorAnalytics() {
    const tasks = getTasks();
    const teamMembers = getTeamMembers();
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const executionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const executionRateEl = document.getElementById('mentorExecutionRate');
    if (executionRateEl) executionRateEl.textContent = executionRate + '%';
    
    // Load team members list
    const teamList = document.getElementById('mentorTeamMembersList');
    if (teamList) {
        if (teamMembers.length === 0) {
            teamList.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <p class="text-sm">No team members yet</p>
                </div>
            `;
        } else {
            teamList.innerHTML = teamMembers.map(member => {
                const memberTasks = tasks.filter(t => t.assignee === member.role);
                const memberCompleted = memberTasks.filter(t => t.status === 'Completed').length;
                const memberProgress = memberTasks.length > 0 ? Math.round((memberCompleted / memberTasks.length) * 100) : 0;
                
                return `
                    <div class="p-4 border border-gray-200 rounded mb-3">
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <p class="font-medium">${member.name}</p>
                                <p class="text-xs text-gray-500">${member.role}</p>
                            </div>
                            <span class="badge badge-blue">${memberTasks.length} tasks</span>
                        </div>
                        <div class="mt-3">
                            <div class="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>${memberProgress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${memberProgress}%;"></div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Create Chart
    createMentorProgressChart();
}

function createMentorProgressChart() {
    const canvas = document.getElementById('mentorProgressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if any
    if (window.mentorChart) {
        window.mentorChart.destroy();
    }
    
    const tasks = getTasks();
    const pendingCount = tasks.filter(t => t.status === 'Pending').length;
    const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
    const completedCount = tasks.filter(t => t.status === 'Completed').length;
    
    window.mentorChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'In Progress', 'Completed'],
            datasets: [{
                data: [pendingCount, inProgressCount, completedCount],
                backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Overall Task Distribution',
                    font: {
                        size: 14
                    }
                }
            }
        }
    });
}

function loadMentorTasks() {
    const tasks = getTasks();
    const tasksList = document.getElementById('mentorTasksList');
    const noTasksMsg = document.getElementById('noMentorTasksMessage');
    
    if (!tasksList) return;
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '';
        if (noTasksMsg) noTasksMsg.style.display = 'block';
        return;
    }
    
    if (noTasksMsg) noTasksMsg.style.display = 'none';
    
    tasksList.innerHTML = tasks.map(task => {
        const statusColors = {
            'Pending': 'badge-gray',
            'In Progress': 'badge-blue',
            'Completed': 'badge-green'
        };
        
        return `
            <div class="task-card">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <p class="font-medium mb-1">${task.title}</p>
                        <div class="flex items-center gap-3 text-sm text-gray-500">
                            <span>👤 ${task.assignee === 'team' ? 'Team Member' : 'Co-Founder'}</span>
                            <span>📅 ${new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <span class="badge ${statusColors[task.status]}">${task.status}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// INVESTOR DASHBOARD FUNCTIONS
// ============================================

function loadInvestorTeams() {
    const startupData = getStartupData();
    const teamsList = document.getElementById('investorTeamsList');
    const noTeamsMsg = document.getElementById('noTeamsAvailable');

    if (!startupData || !startupData.created) {
        teamsList.innerHTML = '';
        noTeamsMsg.style.display = 'block';
        return;
    }

    noTeamsMsg.style.display = 'none';

    teamsList.innerHTML = `
        <div class="investor-team-card fade-in" onclick="viewTeamDetails()">
            <div class="mb-4">
                <div class="text-sm text-emerald-600 font-semibold mb-2">STARTUP OPPORTUNITY</div>
                <h2 class="investor-team-name">${startupData.name}</h2>
                <div class="flex items-center gap-3 mb-3">
                    <span class="badge badge-blue">${startupData.stage}</span>
                    <span class="text-sm text-gray-500">•</span>
                    <span class="text-sm text-gray-600">${getTeamMembers().length} Team Members</span>
                </div>
            </div>
            <div>
                <h4 class="font-semibold text-sm text-gray-700 mb-2">Vision</h4>
                <p class="text-gray-600 text-sm line-clamp-3">${startupData.vision}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span class="text-sm text-emerald-600 font-medium">View Details →</span>
                <span class="text-xs text-gray-500">Click to explore</span>
            </div>
        </div>
    `;
}

function viewTeamDetails() {
    const startupData = getStartupData();
    const teamMembers = getTeamMembers();
    const tasks = getTasks();

    if (!startupData) return;

    // Update header info
    document.getElementById('detailTeamName').textContent = startupData.name;
    document.getElementById('detailTeamStage').textContent = startupData.stage;
    document.getElementById('detailTeamMembers').textContent = `${teamMembers.length} Team Members`;
    document.getElementById('detailTeamVision').textContent = startupData.vision;

    // Render team members
    const membersList = document.getElementById('detailTeamMembersList');
    if (teamMembers.length === 0) {
        membersList.innerHTML = '<p class="text-gray-500 text-sm">No team members added yet</p>';
    } else {
        membersList.innerHTML = teamMembers.map(member => `
            <div class="member-card">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${member.name}</p>
                        <p class="text-sm text-gray-500">${member.email}</p>
                    </div>
                    <span class="badge badge-blue text-xs">${member.role}</span>
                </div>
            </div>
        `).join('');
    }

    // Calculate progress metrics
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const weekTasks = tasks.filter(t => new Date(t.createdAt) >= weekAgo);
    const weekCompleted = weekTasks.filter(t => t.status === 'Completed').length;
    const weekProgress = weekTasks.length > 0 ? Math.round((weekCompleted / weekTasks.length) * 100) : 0;

    const monthTasks = tasks.filter(t => new Date(t.createdAt) >= monthAgo);
    const monthCompleted = monthTasks.filter(t => t.status === 'Completed').length;
    const monthProgress = monthTasks.length > 0 ? Math.round((monthCompleted / monthTasks.length) * 100) : 0;

    const totalTasks = tasks.length;
    const totalCompleted = tasks.filter(t => t.status === 'Completed').length;
    const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

    // Update week metrics
    document.getElementById('weekTasksCompleted').textContent = `${weekCompleted} / ${weekTasks.length}`;
    document.getElementById('weekProgressBar').style.width = weekProgress + '%';
    document.getElementById('weekProgressPercent').textContent = weekProgress + '% completion rate';

    // Update month metrics
    document.getElementById('monthTasksCompleted').textContent = `${monthCompleted} / ${monthTasks.length}`;
    document.getElementById('monthProgressBar').style.width = monthProgress + '%';
    document.getElementById('monthProgressPercent').textContent = monthProgress + '% completion rate';

    // Update overall stats
    document.getElementById('detailTotalTasks').textContent = totalTasks;
    document.getElementById('detailCompletedTasks').textContent = totalCompleted;
    document.getElementById('detailOverallProgress').textContent = overallProgress + '%';

    // Show team detail section
    document.getElementById('teamDetailNav').style.display = 'block';
    showInvestorSection('teamDetail', document.getElementById('teamDetailNav'));
}

function backToTeamsList() {
    const teamsNav = document.querySelector('#investorDashboard .sidebar-item');
    showInvestorSection('teams', teamsNav);
    document.getElementById('teamDetailNav').style.display = 'none';
}

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================

function selectPlan(plan) {
    const user = getCurrentUser();
    
    if (user.role !== 'founder' && user.role !== 'cofounder') {
        showModal('Access Denied', 'Only founders can upgrade subscription plans.', 'warning');
        return;
    }
    
    if (plan === 'free') {
        showModal('Current Plan', 'You are already on the Free plan.', 'info');
        return;
    }
    
    const subscription = { plan: plan };
    localStorage.setItem('subscription', JSON.stringify(subscription));
    
    const planNames = {
        pro: 'Pro',
        enterprise: 'Enterprise'
    };
    
    showModal('Success!', `Successfully upgraded to ${planNames[plan]} plan!`, 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

function getStartupData() {
    const startupData = localStorage.getItem('startupData');
    return startupData ? JSON.parse(startupData) : null;
}

function saveStartupData(data) {
    localStorage.setItem('startupData', JSON.stringify(data));
}

function hasRole(role) {
    const user = getCurrentUser();
    return user && user.role === role;
}

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing app...');
    
    initializeUsers();
    initializeStartupData();
    initializeTasks();
    initializeFeedback();
    initializeTeamMembers();
    initializeSubscription();
    
    console.log('Initialization complete');
    
    checkAuth();
});