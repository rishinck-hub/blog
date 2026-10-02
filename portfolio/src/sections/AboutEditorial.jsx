import Reveal from '../components/Reveal';
import { profileFacts } from '../data';

const CORE_TOOLS = [
  { name: 'Laravel', icon: '/tools/laravel.svg', color: '#ff2d20' },
  { name: 'Django', icon: '/tools/django.svg', color: '#092e20' },
  { name: 'React.js', icon: '/tools/react.svg', color: '#087ea4' },
  { name: 'MySQL', icon: '/tools/mysql.svg', color: '#4479a1' },
  { name: 'PostgreSQL', icon: '/tools/postgresql.svg', color: '#4169e1' },
  { name: 'Azure', icon: '/tools/azure.svg', color: '#0078d4' },
  { name: 'Docker', icon: '/tools/docker.svg', color: '#2496ed' },
  { name: 'Git', icon: '/tools/git.svg', color: '#f05032' },
];

const SUPPORTING_TOOLS = [
  'PHP', 'Python', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Flask', 'Firebase',
  'Flutter', 'Postman', 'Bitbucket', 'Jira', 'CI/CD', 'QuickBooks Online',
  'Fiserv BankingHub', 'OAuth 2.0', 'OpenAI API', 'Claude', 'Perplexity', 'Manus',
];

export default function AboutEditorial({ compact = false }) {
  const visibleSupportingTools = compact ? SUPPORTING_TOOLS.slice(0, 8) : SUPPORTING_TOOLS;

  return (
    <section id="about" className="intro section-shell">
      <div className="section-kicker">
        <span>01</span>
        <p>About</p>
      </div>

      <div className="intro__statement">
        <Reveal>
          <p>
            I turn real product workflows into <em>dependable software</em> that is
            clear to use and maintain.
          </p>
        </Reveal>
      </div>

      <div className="intro__details">
        <Reveal>
          <p>
            I build backend services, RESTful APIs, and full-stack applications using
            PHP, Laravel, React.js, Python, Django REST Framework, MySQL, and PostgreSQL.
            My experience includes authentication, role-based access, request validation,
            backend debugging, cloud deployment, and third-party fintech integrations.
          </p>
        </Reveal>
        {!compact && (
          <>
            <Reveal delay={80}>
              <p>
                During a four-month paid internship at Zil Money, I contributed to
                OnlineCheckWriter.com, QuickBooks Online integration updates, Fiserv
                BankingHub API research, and internal Super Admin and attendance systems.
              </p>
            </Reveal>
            <dl className="intro__facts">
              {profileFacts.map(fact => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>

      <div className="intro__stack">
        <div className="intro__stack-heading">
          <p className="eyebrow">Tools & technologies</p>
          <span>Core toolkit</span>
        </div>
        <div className="tool-grid" role="list" aria-label="Core development tools">
          {CORE_TOOLS.map(tool => (
            <div className="tool-grid__item" role="listitem" key={tool.name}>
              <span
                className="tool-grid__icon"
                aria-hidden="true"
                style={{ '--tool-icon': `url(${tool.icon})`, '--tool-color': tool.color }}
              />
              <span className="tool-grid__name">{tool.name}</span>
            </div>
          ))}
        </div>
        <div className="supporting-tools">
          <span>Also working with</span>
          <ul aria-label="Additional technologies">
            {visibleSupportingTools.map(tool => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
