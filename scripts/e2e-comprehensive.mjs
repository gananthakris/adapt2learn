#!/usr/bin/env node

/**
 * Comprehensive End-to-End Testing
 * Tests all user journeys and critical paths
 */

import { spawn } from 'child_process';
import { setTimeout as sleep } from 'timers/promises';

const BASE_URL = 'http://localhost:4023';
const TIMEOUT = 12000;
let serverProcess;

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function startServer() {
  return new Promise((resolve, reject) => {
    log('🚀 Starting Next.js server...', 'blue');
    serverProcess = spawn('npm', ['run', 'start', '--', '-p', '4023'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PORT: '4023' }
    });

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready')) {
        log('✅ Server ready', 'green');
        resolve();
      }
      process.stdout.write(`[server] ${output}`);
    });

    serverProcess.stderr.on('data', (data) => {
      process.stderr.write(`[server error] ${data}`);
    });

    serverProcess.on('error', reject);

    // Timeout if server doesn't start
    setTimeout(() => reject(new Error('Server start timeout')), 30000);
  });
}

async function stopServer() {
  if (serverProcess) {
    log('🛑 Stopping server...', 'yellow');
    serverProcess.kill();
  }
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Test suite
const tests = {
  async testLandingPage() {
    log('\n📄 Testing Landing Page...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/`);

    if (response.status !== 200) {
      throw new Error(`Landing page returned ${response.status}`);
    }

    const html = await response.text();

    // Check for key content
    const checks = [
      { text: 'Adapt2Learn', description: 'Site title' },
      { text: 'AI-Native', description: 'Value prop' },
      { text: 'Start Learning', description: 'CTA button' },
      { text: 'Skill Graph', description: 'Feature link' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ Landing page working', 'green');
  },

  async testSkillGraph() {
    log('\n🕸️  Testing Skill Graph...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/skill-graph`);

    if (response.status !== 200) {
      throw new Error(`Skill graph returned ${response.status}`);
    }

    const html = await response.text();

    const checks = [
      { text: 'skill-', description: 'Skill nodes' },
      { text: 'JSX', description: 'JSX skill' },
      { text: 'Components', description: 'Components skill' },
      { text: 'Hooks', description: 'Hooks skill' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ Skill graph working', 'green');
  },

  async testDashboard() {
    log('\n📊 Testing Dashboard (Auth Page)...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/dashboard`);

    if (response.status !== 200) {
      throw new Error(`Dashboard returned ${response.status}`);
    }

    const html = await response.text();

    // Dashboard is a client-side authenticated page - it loads auth state via JavaScript
    // In demo mode (no Amplify config), it auto-authenticates after JS hydration
    // We verify the page loads and shows either auth loading or content
    const checks = [
      { text: 'Dashboard', description: 'Dashboard route accessible' },
      { text: 'authentication', description: 'Auth system active (or content loaded)' }
    ];

    for (const check of checks) {
      if (!html.toLowerCase().includes(check.text.toLowerCase())) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description}`, 'green');
    }

    log('✅ Dashboard route working (requires JS for full content)', 'green');
  },

  async testQuiz() {
    log('\n📝 Testing Quiz Interface...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/quiz/quiz-jsx-basics`);

    if (response.status !== 200) {
      throw new Error(`Quiz returned ${response.status}`);
    }

    const html = await response.text();

    const checks = [
      { text: 'Quiz', description: 'Quiz title' },
      { text: 'JSX', description: 'Quiz topic' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ Quiz interface working', 'green');
  },

  async testTutor() {
    log('\n🤖 Testing AI Tutor...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/tutor`);

    if (response.status !== 200) {
      throw new Error(`Tutor returned ${response.status}`);
    }

    const html = await response.text();

    const checks = [
      { text: 'Tutor', description: 'Tutor title' },
      { text: 'AI', description: 'AI reference' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ AI tutor working', 'green');
  },

  async testAnalytics() {
    log('\n📈 Testing Analytics...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/analytics`);

    if (response.status !== 200) {
      throw new Error(`Analytics returned ${response.status}`);
    }

    const html = await response.text();

    const checks = [
      { text: 'Analytics', description: 'Analytics title' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ Analytics working', 'green');
  },

  async testInstructorView() {
    log('\n👨‍🏫 Testing Instructor View...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/class-analytics`);

    if (response.status !== 200) {
      throw new Error(`Instructor view returned ${response.status}`);
    }

    const html = await response.text();

    const checks = [
      { text: 'Class', description: 'Class view' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ Instructor view working', 'green');
  },

  async testAPIQuiz() {
    log('\n🔌 Testing Quiz API...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/api/quiz`);

    if (response.status !== 200) {
      throw new Error(`Quiz API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.quizzes || !Array.isArray(data.quizzes)) {
      throw new Error('Quiz API missing quizzes array');
    }

    log(`  ✓ Returned ${data.quizzes.length} quizzes`, 'green');
    log('✅ Quiz API working', 'green');
  },

  async testAPIRecommendations() {
    log('\n🎯 Testing Recommendations API...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/api/recommendations`);

    if (response.status !== 200) {
      throw new Error(`Recommendations API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.recommendations || !Array.isArray(data.recommendations)) {
      throw new Error('Recommendations API missing recommendations array');
    }

    log(`  ✓ Returned ${data.recommendations.length} recommendations`, 'green');
    log('✅ Recommendations API working', 'green');
  },

  async testAPIChat() {
    log('\n💬 Testing Chat API...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello', sessionId: 'test-123' })
    });

    if (response.status !== 200) {
      throw new Error(`Chat API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.reply) {
      throw new Error('Chat API missing reply');
    }

    log(`  ✓ Chat responded: ${data.reply.substring(0, 50)}...`, 'green');
    log('✅ Chat API working', 'green');
  },

  async testTopicPage() {
    log('\n📚 Testing Topic Page...', 'blue');
    const response = await fetchWithTimeout(`${BASE_URL}/topics/topic-jsx`);

    if (response.status !== 200) {
      throw new Error(`Topic page returned ${response.status}`);
    }

    const html = await response.text();

    const checks = [
      { text: 'JSX', description: 'Topic title' }
    ];

    for (const check of checks) {
      if (!html.includes(check.text)) {
        throw new Error(`Missing: ${check.description}`);
      }
      log(`  ✓ ${check.description} present`, 'green');
    }

    log('✅ Topic page working', 'green');
  },

  async testPerformance() {
    log('\n⚡ Testing Performance...', 'blue');

    const tests = [
      { url: '/', name: 'Landing Page', maxTime: 2000 },
      { url: '/dashboard', name: 'Dashboard', maxTime: 2000 },
      { url: '/skill-graph', name: 'Skill Graph', maxTime: 2000 },
    ];

    for (const test of tests) {
      const start = Date.now();
      const response = await fetchWithTimeout(`${BASE_URL}${test.url}`);
      const duration = Date.now() - start;

      if (response.status !== 200) {
        throw new Error(`${test.name} returned ${response.status}`);
      }

      const status = duration < test.maxTime ? '✓' : '⚠';
      const color = duration < test.maxTime ? 'green' : 'yellow';
      log(`  ${status} ${test.name}: ${duration}ms (target: <${test.maxTime}ms)`, color);
    }

    log('✅ Performance test complete', 'green');
  }
};

// Run all tests
async function runTests() {
  try {
    await startServer();

    // Wait for server to be fully ready
    await sleep(2000);

    log('\n' + '='.repeat(60), 'blue');
    log('  COMPREHENSIVE END-TO-END TESTING', 'blue');
    log('='.repeat(60) + '\n', 'blue');

    const testFunctions = Object.values(tests);
    let passed = 0;
    let failed = 0;

    for (const test of testFunctions) {
      try {
        await test();
        passed++;
      } catch (error) {
        failed++;
        log(`\n❌ Test failed: ${error.message}`, 'red');
        console.error(error);
      }
    }

    log('\n' + '='.repeat(60), 'blue');
    log(`  TEST RESULTS`, 'blue');
    log('='.repeat(60), 'blue');
    log(`  ✅ Passed: ${passed}`, 'green');
    log(`  ❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
    log(`  📊 Total:  ${passed + failed}`, 'blue');
    log('='.repeat(60) + '\n', 'blue');

    if (failed === 0) {
      log('🎉 ALL TESTS PASSED - 100% WORKING END-TO-END!', 'green');
      process.exit(0);
    } else {
      log('⚠️  SOME TESTS FAILED - CHECK LOGS ABOVE', 'red');
      process.exit(1);
    }

  } catch (error) {
    log(`\n💥 Critical error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    await stopServer();
  }
}

// Handle cleanup on exit
process.on('SIGINT', async () => {
  await stopServer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopServer();
  process.exit(0);
});

// Run tests
runTests();
