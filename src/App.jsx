import { useEffect, useMemo, useState } from 'react'
import './App.css'

const defaultMembers = [
  {
    id: 1,
    name: '김하늘',
    email: 'haneul@campus.ac.kr',
    skills: {
      자료조사: 5,
      기획: 4,
      문서작성: 3,
      일정관리: 3,
      데이터분석: 4,
      디자인: 2,
      발표: 3,
      검수: 3,
    },
    hours: 9,
    style: '정리형',
  },
  {
    id: 2,
    name: '박서준',
    email: 'seojoon@campus.ac.kr',
    skills: {
      자료조사: 2,
      기획: 3,
      문서작성: 3,
      일정관리: 2,
      데이터분석: 2,
      디자인: 5,
      발표: 5,
      검수: 3,
    },
    hours: 6,
    style: '표현형',
  },
  {
    id: 3,
    name: '이민지',
    email: 'minji@campus.ac.kr',
    skills: {
      자료조사: 3,
      기획: 4,
      문서작성: 5,
      일정관리: 5,
      데이터분석: 3,
      디자인: 2,
      발표: 3,
      검수: 4,
    },
    hours: 8,
    style: '관리형',
  },
  {
    id: 4,
    name: '최도윤',
    email: 'doyun@campus.ac.kr',
    skills: {
      자료조사: 4,
      기획: 3,
      문서작성: 3,
      일정관리: 2,
      데이터분석: 5,
      디자인: 2,
      발표: 2,
      검수: 5,
    },
    hours: 5,
    style: '분석형',
  },
]

const roles = [
  {
    name: 'PM / 일정 조율',
    needs: ['일정관리', '기획'],
    reason: '마감일과 회의 흐름을 관리해 자료와 소통을 하나로 묶습니다.',
  },
  {
    name: '문제 정의 / 기획',
    needs: ['기획', '자료조사'],
    reason: '문제 배경과 핵심 타깃을 정리해 프로젝트 방향을 잡습니다.',
  },
  {
    name: '자료조사 / 레퍼런스',
    needs: ['자료조사', '검수'],
    reason: '근거 수집과 문제 정의를 맡아 프로젝트의 방향성을 만듭니다.',
  },
  {
    name: '데이터 분석',
    needs: ['데이터분석', '자료조사'],
    reason: '설문, 시장 자료, 사용자 데이터를 읽고 인사이트를 도출합니다.',
  },
  {
    name: '보고서 작성',
    needs: ['문서작성', '자료조사'],
    reason: '버전이 흩어지지 않도록 결과물을 구조화하고 정리합니다.',
  },
  {
    name: '디자인 / 시각화',
    needs: ['디자인', '데이터분석'],
    reason: '핵심 내용을 보기 쉽게 시각화하고 화면 완성도를 높입니다.',
  },
  {
    name: '발표 스토리텔링',
    needs: ['발표', '기획'],
    reason: '시각 자료와 발표 흐름을 다듬어 전달력을 높입니다.',
  },
  {
    name: '최종 검수 / 품질관리',
    needs: ['검수', '문서작성'],
    reason: '오탈자, 논리 흐름, 제출 전 완성도를 마지막으로 점검합니다.',
  },
]

const workspaceTools = [
  {
    name: '문서 공동 편집',
    description: '보고서 초안과 최종본을 한 곳에서 작성합니다.',
    status: '초안 문서 생성',
  },
  {
    name: '스마트 칸반',
    description: '할 일, 진행 중, 완료 업무를 역할별로 정리합니다.',
    status: '기본 보드 준비',
  },
  {
    name: '팀 채팅',
    description: '과제 관련 대화와 의사결정을 워크스페이스에 남깁니다.',
    status: '팀 채널 생성',
  },
  {
    name: '회의록 보관',
    description: '회의 내용, 결정 사항, 다음 액션을 누적 기록합니다.',
    status: '회의록 템플릿 준비',
  },
  {
    name: '일정 캘린더',
    description: '마감일, 발표일, 중간 점검 일정을 공유합니다.',
    status: '마감 일정 등록',
  },
  {
    name: '자료 저장소',
    description: '논문, 기사, 이미지, 링크 자료를 카테고리별로 모읍니다.',
    status: '자료 폴더 생성',
  },
  {
    name: '역할 추천 리포트',
    description: '세부 강점과 가능 시간 기반 추천 결과를 보관합니다.',
    status: '추천 리포트 연결',
  },
  {
    name: '기여도 로그',
    description: '팀원별 작업, 수정, 검수 활동을 기록할 준비를 합니다.',
    status: '활동 로그 활성화',
  },
]

const strengthOptions = [
  '자료조사',
  '기획',
  '문서작성',
  '일정관리',
  '데이터분석',
  '디자인',
  '발표',
  '검수',
]

const projectTasks = [
  { title: '문제 배경 자료 3개 수집', owner: '김하늘', status: '진행 중' },
  { title: '서비스 핵심 기능 와이어프레임 정리', owner: '박서준', status: '진행 중' },
  { title: '제안서 목차와 평가 기준 맞추기', owner: '이민지', status: '완료' },
  { title: '무임승차 관련 근거 데이터 검수', owner: '최도윤', status: '대기' },
]

const chatMessages = [
  { author: '이민지', text: '오늘은 역할 추천 화면까지 먼저 정리하고, 내일 리포트 흐름 붙이면 좋을 것 같아요.' },
  { author: '김하늘', text: '자료조사 근거는 PBL, 무임승차 설문, 동료평가 문제 중심으로 묶어볼게요.' },
  { author: 'FairMate AI', text: '마감일까지 20일 남았습니다. 발표 자료 담당자를 오늘 안에 확정하는 것을 추천합니다.' },
]

const projectFiles = [
  '제안배경_근거자료.pdf',
  'FairMate_핵심기능정리.md',
  '아이디어톤_발표초안.pptx',
  '팀원_역할추천_리포트.json',
]

const meetingNotes = [
  '워크스페이스는 자료, 일정, 소통을 한 화면에 모으는 방향으로 확정',
  '역할 배정은 이름/이메일이 아니라 자기진단 점수 기반으로 설명',
  '교수자 제출용 기여도 리포트는 후속 기능으로 제안',
]

const calendarItems = [
  { date: '05.20', title: '문제 정의 초안 공유' },
  { date: '05.27', title: '발표 자료 1차 완성' },
  { date: '06.05', title: '최종 제출' },
]

function createSkillProfile(primarySkill = '자료조사') {
  return strengthOptions.reduce((profile, skill) => {
    profile[skill] = skill === primarySkill ? 4 : 2
    return profile
  }, {})
}

function getTopSkills(member, limit = 2) {
  return Object.entries(member.skills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([skill]) => skill)
}

function scoreMember(member, role) {
  const skillScore = role.needs.reduce(
    (total, need) => total + (member.skills[need] ?? 0) * 12,
    0,
  )
  const timeScore = Math.min(member.hours, 10) * 4
  const balanceScore = member.style === '관리형' && role.name.includes('PM') ? 12 : 0

  return skillScore + timeScore + balanceScore
}

function getDisplayScore(score, member) {
  const maxSkillScore = 5 * 12 * 2
  const maxTimeScore = Math.min(member.hours, 10) * 4
  const maxBalanceScore = member.style === '관리형' ? 12 : 0
  const maxScore = maxSkillScore + maxTimeScore + maxBalanceScore

  return Math.round((score / maxScore) * 100)
}

function getRecommendationBasis(member, role) {
  if (!member) return '팀원 데이터를 입력하면 추천 근거가 표시됩니다.'

  const roleScores = role.needs
    .map((need) => `${need} ${member.skills[need] ?? 0}점`)
    .join(', ')
  const timeText = `주당 ${member.hours}시간 참여 가능`

  return `역할 요구 역량 점수: ${roleScores} · ${timeText}`
}

function recommendRoles(members) {
  return members.map((member) => {
    const picks = roles
      .map((role) => {
        const score = scoreMember(member, role)

        return {
          role,
          score,
          displayScore: getDisplayScore(score, member),
        }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)

    return {
      member,
      picks,
    }
  })
}

function slugify(text) {
  return encodeURIComponent(text.trim().replace(/\s+/g, '-').toLowerCase())
}

function hasTool(selectedTools, toolName) {
  return selectedTools.includes(toolName)
}

function App() {
  const [workspace, setWorkspace] = useState({
    title: '공정한 조별과제 플랫폼 제안서',
    course: '창업 아이디어톤',
    deadline: '2026-06-05',
  })
  const [members, setMembers] = useState(defaultMembers)
  const [selectedTools, setSelectedTools] = useState(
    workspaceTools.map((tool) => tool.name),
  )
  const [workspaceCreated, setWorkspaceCreated] = useState(false)
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [initialSkill, setInitialSkill] = useState('자료조사')

  const recommendations = useMemo(() => recommendRoles(members), [members])
  const selectedToolItems = workspaceTools.filter((tool) =>
    selectedTools.includes(tool.name),
  )

  const workspaceReady =
    workspace.title && workspace.course && workspace.deadline && selectedTools.length > 0

  function updateWorkspace(field, value) {
    setWorkspace((current) => ({ ...current, [field]: value }))
    setWorkspaceCreated(false)
  }

  function toggleTool(tool) {
    setSelectedTools((current) =>
      current.includes(tool)
        ? current.filter((selectedTool) => selectedTool !== tool)
        : [...current, tool],
    )
    setWorkspaceCreated(false)
  }

  function createWorkspace() {
    if (!workspaceReady) return
    setWorkspaceCreated(true)
    window.history.pushState(
      { workspaceCreated: true },
      '',
      `/workspace/${slugify(workspace.title)}`,
    )
  }

  function editWorkspace() {
    setWorkspaceCreated(false)
    window.history.pushState({}, '', '/')
  }

  function addMember(event) {
    event.preventDefault()
    const trimmedName = inviteName.trim()
    const trimmedEmail = inviteEmail.trim()

    if (!trimmedName || !trimmedEmail) return

    const newMember = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      skills: createSkillProfile(initialSkill),
      hours: 5,
      style: '자기진단',
    }

    setMembers((current) => [...current, newMember])
    setInviteName('')
    setInviteEmail('')
  }

  function updateHours(id, hours) {
    setMembers((current) =>
      current.map((member) =>
        member.id === id ? { ...member, hours: Number(hours) } : member,
      ),
    )
  }

  function updateSkill(id, skill, value) {
    setMembers((current) =>
      current.map((member) =>
        member.id === id
          ? {
              ...member,
              skills: {
                ...member.skills,
                [skill]: Number(value),
              },
            }
          : member,
      ),
    )
  }

  useEffect(() => {
    function syncPageWithUrl() {
      setWorkspaceCreated(window.location.pathname.startsWith('/workspace/'))
    }

    syncPageWithUrl()
    window.addEventListener('popstate', syncPageWithUrl)

    return () => window.removeEventListener('popstate', syncPageWithUrl)
  }, [])

  if (workspaceCreated) {
    return (
      <main className="workspace-page">
        <aside className="workspace-sidebar">
          <a
            className="brand"
            href="/"
            onClick={(event) => {
              event.preventDefault()
              editWorkspace()
            }}
            aria-label="FairMate 홈"
          >
            <span className="brand-mark">FM</span>
            <strong>FairMate</strong>
          </a>
          <nav aria-label="워크스페이스 메뉴">
            <a href="#overview">홈 대시보드</a>
            {hasTool(selectedTools, '문서 공동 편집') && (
              <a href="#document">문서 편집</a>
            )}
            {hasTool(selectedTools, '스마트 칸반') && <a href="#kanban">칸반 보드</a>}
            {hasTool(selectedTools, '팀 채팅') && <a href="#chat">팀 채팅</a>}
            {(hasTool(selectedTools, '일정 캘린더') ||
              hasTool(selectedTools, '자료 저장소')) && (
              <a href="#schedule">일정·자료</a>
            )}
            {hasTool(selectedTools, '역할 추천 리포트') && (
              <a href="#roles">AI 역할 추천</a>
            )}
          </nav>
          <button type="button" className="ghost-button" onClick={editWorkspace}>
            설정으로 돌아가기
          </button>
        </aside>

        <section className="workspace-main">
          <header className="workspace-page-header" id="overview">
            <div>
              <p className="eyebrow">Workspace</p>
              <h1>{workspace.title}</h1>
              <span>
                {workspace.course} · 마감일 {workspace.deadline}
              </span>
            </div>
            <div className="workspace-url">
              {window.location.pathname}
            </div>
          </header>

          <div className="dashboard-stats">
            <div>
              <strong>{members.length}</strong>
              <span>초대된 팀원</span>
            </div>
            <div>
              <strong>{selectedToolItems.length}</strong>
              <span>활성화 도구</span>
            </div>
            <div>
              <strong>{recommendations.length * 2}</strong>
              <span>역할 추천</span>
            </div>
          </div>

          <section className="workspace-board" id="tools">
            {hasTool(selectedTools, '문서 공동 편집') && (
            <article className="work-panel document-panel" id="document">
              <div className="panel-heading">
                <span>문서 공동 편집</span>
                <strong>제안서 초안</strong>
              </div>
              <div className="document-preview">
                <h3>FairMate: 공정한 조별과제 워크스페이스</h3>
                <p>
                  대학 PBL 환경에서 자료 분산, 역할 불균형, 무임승차로 인한
                  갈등을 줄이기 위해 팀 활동 데이터를 한 공간에 모읍니다.
                </p>
                <ul>
                  <li>문제: 역할 떠넘기기와 소통 창구 분산</li>
                  <li>해결: 워크스페이스 생성 후 AI 역할 추천</li>
                  <li>효과: 초기 합의 비용 감소와 객관적 기여도 기록</li>
                </ul>
              </div>
            </article>
            )}

            {hasTool(selectedTools, '스마트 칸반') && (
            <article className="work-panel kanban-panel" id="kanban">
              <div className="panel-heading">
                <span>스마트 칸반</span>
                <strong>오늘의 할 일</strong>
              </div>
              <div className="task-list">
                {projectTasks.map((task) => (
                  <div className="task-item" key={task.title}>
                    <div>
                      <strong>{task.title}</strong>
                      <span>{task.owner}</span>
                    </div>
                    <small>{task.status}</small>
                  </div>
                ))}
              </div>
            </article>
            )}

            {hasTool(selectedTools, '팀 채팅') && (
            <article className="work-panel chat-panel" id="chat">
              <div className="panel-heading">
                <span>팀 채팅</span>
                <strong>최근 대화</strong>
              </div>
              <div className="chat-list">
                {chatMessages.map((message) => (
                  <div className="chat-message" key={`${message.author}-${message.text}`}>
                    <strong>{message.author}</strong>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            </article>
            )}

            {hasTool(selectedTools, '스마트 칸반') && (
            <article className="work-panel ai-action-panel">
              <div className="panel-heading">
                <span>FairMate AI</span>
                <strong>다음 액션 제안</strong>
              </div>
              <div className="ai-action">
                <p>역할 추천 결과 기준으로 아직 비어 있는 발표 스토리라인을 먼저 정리하세요.</p>
                <button type="button">칸반에 추가</button>
              </div>
            </article>
            )}

            {hasTool(selectedTools, '일정 캘린더') && (
            <article className="work-panel calendar-panel" id="schedule">
              <div className="panel-heading">
                <span>일정 캘린더</span>
                <strong>마감 흐름</strong>
              </div>
              <div className="calendar-list">
                {calendarItems.map((item) => (
                  <div key={item.date}>
                    <b>{item.date}</b>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </article>
            )}

            {hasTool(selectedTools, '자료 저장소') && (
            <article className="work-panel file-panel" id="schedule">
              <div className="panel-heading">
                <span>자료 저장소</span>
                <strong>공유 파일</strong>
              </div>
              <ul className="file-list">
                {projectFiles.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </article>
            )}

            {hasTool(selectedTools, '회의록 보관') && (
            <article className="work-panel notes-panel">
              <div className="panel-heading">
                <span>회의록 보관</span>
                <strong>최근 결정 사항</strong>
              </div>
              <ol className="note-list">
                {meetingNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ol>
            </article>
            )}

            {hasTool(selectedTools, '역할 추천 리포트') && (
            <article className="work-panel role-mini-panel" id="roles">
              <div className="panel-heading">
                <span>역할 추천 리포트</span>
                <strong>1순위 역할 요약</strong>
              </div>
              <div className="mini-role-list">
                {recommendations.map(({ member, picks }) => (
                  <div key={member.id}>
                    <span>{member.name}</span>
                    <strong>{picks[0].role.name}</strong>
                  </div>
                ))}
              </div>
            </article>
            )}

            {hasTool(selectedTools, '기여도 로그') && (
            <article className="work-panel contribution-panel">
              <div className="panel-heading">
                <span>기여도 로그</span>
                <strong>활동 기록</strong>
              </div>
              <div className="log-list">
                <p>이민지 · 제안서 목차 수정 · 14:20</p>
                <p>김하늘 · 근거 자료 링크 추가 · 14:42</p>
                <p>최도윤 · 자료 출처 검수 완료 · 15:05</p>
              </div>
            </article>
            )}
          </section>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-section">
        <nav className="topbar" aria-label="서비스 주요 정보">
          <a className="brand" href="/" aria-label="FairMate 홈">
            <span className="brand-mark">FM</span>
            <strong>FairMate</strong>
          </a>
          <span>팀플 시작을 공정하게 정리하는 AI 워크스페이스</span>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">All-in-One Team Project Workspace</p>
            <h1>팀플 시작을 공정하게, 역할 분배는 똑똑하게</h1>
            <p>
              워크스페이스 생성, 팀원 초대, 강점과 가능 시간 기반 역할 추천을
              프론트엔드 상태만으로 시연할 수 있게 구성했습니다.
            </p>
          </div>

          {!workspaceCreated ? (
          <div className="workspace-card" aria-label="워크스페이스 생성 패널">
            <div className="card-heading">
              <span>1</span>
              <div>
                <h2>워크스페이스 개설</h2>
                <p>흩어진 자료와 소통 창구를 하나로 통합</p>
              </div>
            </div>

            <label>
              과제명
              <input
                value={workspace.title}
                onChange={(event) => updateWorkspace('title', event.target.value)}
              />
            </label>
            <label>
              수업 / 프로젝트
              <input
                value={workspace.course}
                onChange={(event) => updateWorkspace('course', event.target.value)}
              />
            </label>
            <label>
              마감일
              <input
                type="date"
                value={workspace.deadline}
                onChange={(event) => updateWorkspace('deadline', event.target.value)}
              />
            </label>

            <div className="tool-list" aria-label="워크스페이스에 포함할 협업 도구">
              {workspaceTools.map((tool) => (
                <label className="tool-option" key={tool.name}>
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool.name)}
                    onChange={() => toggleTool(tool.name)}
                  />
                  <span>{tool.name}</span>
                </label>
              ))}
            </div>

            <button
              type="button"
              className="workspace-button"
              disabled={!workspaceReady}
              onClick={createWorkspace}
            >
              워크스페이스 생성
            </button>

            <div
              className={
                workspaceCreated
                  ? 'status ready'
                  : workspaceReady
                    ? 'status standby'
                    : 'status'
              }
            >
              {workspaceCreated
                ? `${selectedTools.length}개 도구가 포함된 워크스페이스가 생성되었습니다`
                : workspaceReady
                  ? '생성할 준비가 완료되었습니다'
                  : '필수 정보와 포함할 도구를 선택하세요'}
            </div>
          </div>
          ) : (
            <section className="workspace-dashboard" aria-label="생성된 워크스페이스">
              <div className="dashboard-header">
                <div>
                  <p className="eyebrow">Workspace Created</p>
                  <h2>{workspace.title}</h2>
                  <span>
                    {workspace.course} · 마감일 {workspace.deadline}
                  </span>
                </div>
                <button type="button" className="ghost-button" onClick={editWorkspace}>
                  설정 수정
                </button>
              </div>

              <div className="dashboard-stats">
                <div>
                  <strong>{members.length}</strong>
                  <span>초대된 팀원</span>
                </div>
                <div>
                  <strong>{selectedToolItems.length}</strong>
                  <span>활성화 도구</span>
                </div>
                <div>
                  <strong>{recommendations.length * 2}</strong>
                  <span>역할 추천</span>
                </div>
              </div>

              <div className="dashboard-tools">
                {selectedToolItems.map((tool) => (
                  <article key={tool.name}>
                    <p>{tool.status}</p>
                    <strong>{tool.name}</strong>
                    <span>{tool.description}</span>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="content-grid">
        <div className="invite-panel">
          <div className="section-title">
            <span>초대</span>
            <h2>팀원 초대와 입력 데이터</h2>
            <p>
              이름과 이메일은 초대용 정보입니다. 역할 추천은 아래 세부 강점
              자기진단 점수와 가능 시간을 기준으로 계산됩니다.
            </p>
          </div>

          <form className="invite-form" onSubmit={addMember}>
            <input
              placeholder="이름"
              value={inviteName}
              onChange={(event) => setInviteName(event.target.value)}
              aria-label="팀원 이름"
            />
            <input
              type="email"
              placeholder="team@campus.ac.kr"
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              aria-label="초대할 이메일"
            />
            <select
              value={initialSkill}
              onChange={(event) => setInitialSkill(event.target.value)}
              aria-label="초기 강점 프리셋"
            >
              {strengthOptions.map((strength) => (
                <option key={strength}>{strength}</option>
              ))}
            </select>
            <button type="submit">초대 추가</button>
          </form>

          <div className="member-list">
            {members.map((member) => (
              <article className="member-row" key={member.id}>
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.email}</span>
                  <div className="chips">
                    {getTopSkills(member).map((strength) => (
                      <small key={strength}>{strength}</small>
                    ))}
                    <small>{member.style}</small>
                  </div>
                </div>
                <label>
                  주당 {member.hours}h
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={member.hours}
                    onChange={(event) => updateHours(member.id, event.target.value)}
                  />
                </label>
                <div className="skill-grid" aria-label={`${member.name} 세부 강점`}>
                  {strengthOptions.map((skill) => (
                    <label key={skill}>
                      <span>
                        {skill} <b>{member.skills[skill]}</b>
                      </span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={member.skills[skill]}
                        onChange={(event) =>
                          updateSkill(member.id, skill, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="ai-panel">
          <div className="section-title">
            <span>AI</span>
            <h2>역할 분배 추천</h2>
          </div>

          <div className="recommendations">
            {recommendations.map(({ member, picks }) => (
              <article className="member-recommendation" key={member.id}>
                <div className="recommendation-owner">
                  <div>
                    <p>{member.email}</p>
                    <strong>{member.name}</strong>
                  </div>
                  <span>상위 강점 {getTopSkills(member).join(', ')}</span>
                </div>
                <div className="role-picks">
                  {picks.map(({ role, displayScore }, index) => (
                    <div className="role-card" key={`${member.id}-${role.name}`}>
                      <div className="rank-line">
                        <p>{index === 0 ? '1순위 역할 추천' : '2순위 역할 추천'}</p>
                        <span>{displayScore}점</span>
                      </div>
                      <strong>{role.name}</strong>
                      <meter min="0" max="100" value={displayScore}>
                        {displayScore}
                      </meter>
                      <span>{role.reason}</span>
                      <p className="basis">{getRecommendationBasis(member, role)}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flow-section" aria-label="서비스 이용 흐름">
        <div className="section-title">
          <span>Flow</span>
          <h2>프론트 시연 흐름</h2>
        </div>
        <ol>
          <li>조장이 과제명, 수업명, 마감일을 입력해 워크스페이스를 엽니다.</li>
          <li>팀원 이름, 이메일, 초기 강점 프리셋으로 초대 목록을 구성합니다.</li>
          <li>세부 강점 점수와 가능 시간을 조정하면 인당 추천 역할이 다시 계산됩니다.</li>
          <li>각 팀원의 1순위, 2순위 역할을 보고 초기 눈치싸움을 줄입니다.</li>
        </ol>
      </section>
    </main>
  )
}

export default App
