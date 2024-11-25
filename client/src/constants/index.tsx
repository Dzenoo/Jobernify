import {
  GaugeCircle,
  LayoutDashboard,
  MonitorSmartphone,
  Paintbrush,
  Scale3D,
  User,
} from "lucide-react";

export const AWS_URL =
  process.env.AWS_URL ?? "https://jobernify.s3.eu-north-1.amazonaws.com";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const NavbarLandingLinks = [
  {
    id: 1,
    title: "Home",
    href: "hero",
  },
  {
    id: 2,
    title: "Features",
    href: "features",
  },
  {
    id: 3,
    title: "Benefits",
    href: "benefits",
  },
  {
    id: 4,
    title: "FAQ",
    href: "faq",
  },
];

// ===============================
// Navbar Links
// ===============================
export const SeekersNavbarLinks = [
  {
    id: "1",
    title: "Find Jobs",
    href: "/jobs",
  },
  {
    id: "2",
    title: "Find Companies",
    href: "/companies",
  },
];

// ===============================
// Navbar Actions
// ===============================
export const SeekersNavbarActions = [
  {
    id: "1",
    href: "/profile",
    icon: <User />,
    tooltip: "Profile",
  },
];

export const EmployersNavbarActions = [
  {
    id: "3",
    href: "/dashboard",
    icon: <LayoutDashboard />,
    tooltip: "Dashboard",
  },
];

// ===============================
// Footer Links
// ===============================
export const FooterLinks = [
  // {
  //   id: "1",
  //   title: "Pages",
  //   links: [
  //     { id: "1", name: "Home", href: "/" },
  //     { id: "2", name: "About", href: "/about" },
  //     { id: "3", name: "Contact Us", href: "/contact" },
  //   ],
  // },
  // {
  //   id: "2",
  //   title: "Policies",
  //   links: [
  //     { id: "1", name: "Privacy Policy", href: "/privacy-policy" },
  //     { id: "2", name: "Terms and Conditions", href: "/terms-and-conditions" },
  //     { id: "3", name: "Agreements", href: "/agreements" },
  //   ],
  // },
];

// ===============================
// Dropdown Options
// ===============================
export const companySizes = [
  { value: "less-than-17", label: "Less than 17" },
  { value: "20-50", label: "20-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-250", label: "100-250" },
  { value: "250-500", label: "250-500" },
  { value: "500-1000", label: "500-1000" },
];

export const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "hospitality", label: "Hospitality" },
  { value: "automotive", label: "Automotive" },
  { value: "construction", label: "Construction" },
  { value: "media", label: "Media" },
  { value: "marketing", label: "Marketing" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "government", label: "Government" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "other", label: "Other" },
];

export const locations = [
  { label: "Afghanistan", value: "afg" },
  { label: "Albania", value: "alb" },
  { label: "Algeria", value: "dza" },
  { label: "Andorra", value: "and" },
  { label: "Angola", value: "ago" },
  { label: "Antigua and Barbuda", value: "atg" },
  { label: "Argentina", value: "arg" },
  { label: "Armenia", value: "arm" },
  { label: "Australia", value: "aus" },
  { label: "Austria", value: "aut" },
  { label: "Azerbaijan", value: "aze" },
  { label: "Bahamas", value: "bhs" },
  { label: "Bahrain", value: "bhr" },
  { label: "Bangladesh", value: "bgd" },
  { label: "Barbados", value: "brb" },
  { label: "Belarus", value: "blr" },
  { label: "Belgium", value: "bel" },
  { label: "Belize", value: "blz" },
  { label: "Benin", value: "ben" },
  { label: "Bhutan", value: "btn" },
  { label: "Bolivia", value: "bol" },
  { label: "Bosnia and Herzegovina", value: "bih" },
  { label: "Botswana", value: "bwa" },
  { label: "Brazil", value: "bra" },
  { label: "Brunei", value: "brn" },
  { label: "Bulgaria", value: "bgr" },
  { label: "Burkina Faso", value: "bfa" },
  { label: "Burundi", value: "bdi" },
  { label: "Cabo Verde", value: "cpv" },
  { label: "Cambodia", value: "khm" },
  { label: "Cameroon", value: "cmr" },
  { label: "Canada", value: "can" },
  { label: "Central African Republic", value: "caf" },
  { label: "Chad", value: "tcd" },
  { label: "Chile", value: "chl" },
  { label: "China", value: "chn" },
  { label: "Colombia", value: "col" },
  { label: "Comoros", value: "com" },
  { label: "Congo (Congo-Brazzaville)", value: "cog" },
  { label: "Costa Rica", value: "cri" },
  { label: "Croatia", value: "hrv" },
  { label: "Cuba", value: "cub" },
  { label: "Cyprus", value: "cyp" },
  { label: "Czechia (Czech Republic)", value: "cze" },
  { label: "Democratic Republic of the Congo", value: "cod" },
  { label: "Denmark", value: "dnk" },
  { label: "Djibouti", value: "dji" },
  { label: "Dominica", value: "dma" },
  { label: "Dominican Republic", value: "dom" },
  { label: "Ecuador", value: "ecu" },
  { label: "Egypt", value: "egy" },
  { label: "El Salvador", value: "slv" },
  { label: "Equatorial Guinea", value: "gnq" },
  { label: "Eritrea", value: "eri" },
  { label: "Estonia", value: "est" },
  { label: "Eswatini", value: "swz" },
  { label: "Ethiopia", value: "eth" },
  { label: "Fiji", value: "fji" },
  { label: "Finland", value: "fin" },
  { label: "France", value: "fra" },
  { label: "Gabon", value: "gab" },
  { label: "Gambia", value: "gmb" },
  { label: "Georgia", value: "geo" },
  { label: "Germany", value: "ger" },
  { label: "Ghana", value: "gha" },
  { label: "Greece", value: "grc" },
  { label: "Grenada", value: "grd" },
  { label: "Guatemala", value: "gtm" },
  { label: "Guinea", value: "gin" },
  { label: "Guinea-Bissau", value: "gnb" },
  { label: "Guyana", value: "guy" },
  { label: "Haiti", value: "hti" },
  { label: "Honduras", value: "hnd" },
  { label: "Hungary", value: "hun" },
  { label: "Iceland", value: "isl" },
  { label: "India", value: "ind" },
  { label: "Indonesia", value: "idn" },
  { label: "Iran", value: "irn" },
  { label: "Iraq", value: "irq" },
  { label: "Ireland", value: "irl" },
  { label: "Italy", value: "ita" },
  { label: "Jamaica", value: "jam" },
  { label: "Japan", value: "jpn" },
  { label: "Jordan", value: "jor" },
  { label: "Kazakhstan", value: "kaz" },
  { label: "Kenya", value: "ken" },
  { label: "Kiribati", value: "kir" },
  { label: "Kuwait", value: "kwt" },
  { label: "Kyrgyzstan", value: "kgz" },
  { label: "Laos", value: "lao" },
  { label: "Latvia", value: "lva" },
  { label: "Lebanon", value: "lbn" },
  { label: "Lesotho", value: "lso" },
  { label: "Liberia", value: "lbr" },
  { label: "Libya", value: "lby" },
  { label: "Liechtenstein", value: "lie" },
  { label: "Lithuania", value: "ltu" },
  { label: "Luxembourg", value: "lux" },
  { label: "Madagascar", value: "mdg" },
  { label: "Malawi", value: "mwi" },
  { label: "Malaysia", value: "mys" },
  { label: "Maldives", value: "mdv" },
  { label: "Mali", value: "mli" },
  { label: "Malta", value: "mlt" },
  { label: "Marshall Islands", value: "mhl" },
  { label: "Mauritania", value: "mrt" },
  { label: "Mauritius", value: "mus" },
  { label: "Mexico", value: "mex" },
  { label: "Micronesia", value: "fsm" },
  { label: "Moldova", value: "mda" },
  { label: "Monaco", value: "mco" },
  { label: "Mongolia", value: "mng" },
  { label: "Montenegro", value: "mne" },
  { label: "Morocco", value: "mar" },
  { label: "Mozambique", value: "moz" },
  { label: "Myanmar (Burma)", value: "mmr" },
  { label: "Namibia", value: "nam" },
  { label: "Nauru", value: "nru" },
  { label: "Nepal", value: "npl" },
  { label: "Netherlands", value: "nld" },
  { label: "New Zealand", value: "nzl" },
  { label: "Nicaragua", value: "nic" },
  { label: "Niger", value: "ner" },
  { label: "Nigeria", value: "nga" },
  { label: "North Korea", value: "prk" },
  { label: "North Macedonia", value: "mkd" },
  { label: "Norway", value: "nor" },
  { label: "Oman", value: "omn" },
  { label: "Pakistan", value: "pak" },
  { label: "Palau", value: "plw" },
  { label: "Palestine", value: "pse" },
  { label: "Panama", value: "pan" },
  { label: "Papua New Guinea", value: "png" },
  { label: "Paraguay", value: "pry" },
  { label: "Peru", value: "per" },
  { label: "Philippines", value: "phl" },
  { label: "Poland", value: "pol" },
  { label: "Portugal", value: "prt" },
  { label: "Qatar", value: "qat" },
  { label: "Romania", value: "rou" },
  { label: "Russia", value: "rus" },
  { label: "Rwanda", value: "rwa" },
  { label: "Saint Kitts and Nevis", value: "kna" },
  { label: "Saint Lucia", value: "lca" },
  { label: "Saint Vincent and the Grenadines", value: "vct" },
  { label: "Samoa", value: "wsm" },
  { label: "San Marino", value: "smr" },
  { label: "Sao Tome and Principe", value: "stp" },
  { label: "Saudi Arabia", value: "sau" },
  { label: "Senegal", value: "sen" },
  { label: "Serbia", value: "srb" },
  { label: "Seychelles", value: "syc" },
  { label: "Sierra Leone", value: "sle" },
  { label: "Singapore", value: "sgp" },
  { label: "Slovakia", value: "svk" },
  { label: "Slovenia", value: "svn" },
  { label: "Solomon Islands", value: "slb" },
  { label: "Somalia", value: "som" },
  { label: "South Africa", value: "zaf" },
  { label: "South Korea", value: "kor" },
  { label: "South Sudan", value: "ssd" },
  { label: "Spain", value: "spa" },
  { label: "Sri Lanka", value: "lka" },
  { label: "Sudan", value: "sdn" },
  { label: "Suriname", value: "sur" },
  { label: "Sweden", value: "swe" },
  { label: "Switzerland", value: "che" },
  { label: "Syria", value: "syr" },
  { label: "Taiwan", value: "twn" },
  { label: "Tajikistan", value: "tjk" },
  { label: "Tanzania", value: "tza" },
  { label: "Thailand", value: "tha" },
  { label: "Timor-Leste", value: "tls" },
  { label: "Togo", value: "tgo" },
  { label: "Tonga", value: "ton" },
  { label: "Trinidad and Tobago", value: "tto" },
  { label: "Tunisia", value: "tun" },
  { label: "Turkiye", value: "tur" },
  { label: "Turkmenistan", value: "tkm" },
  { label: "Tuvalu", value: "tuv" },
  { label: "Uganda", value: "uga" },
  { label: "Ukraine", value: "ukr" },
  { label: "United Arab Emirates", value: "are" },
  { label: "United Kingdom", value: "gbr" },
  { label: "United States", value: "usa" },
  { label: "Uruguay", value: "ury" },
  { label: "Uzbekistan", value: "uzb" },
  { label: "Vanuatu", value: "vut" },
  { label: "Vatican City", value: "vat" },
  { label: "Venezuela", value: "ven" },
  { label: "Vietnam", value: "vnm" },
  { label: "Yemen", value: "yem" },
  { label: "Zambia", value: "zmb" },
  { label: "Zimbabwe", value: "zwe" },
];

// ===============================
// Filters Data
// ===============================

export const JobsFiltersData = [
  {
    id: "1",
    title: "Job Type",
    data: [
      { id: "1", title: "Internship", value: "Internship", type: "type" },
      { id: "2", title: "Full-Time", value: "Full-Time", type: "type" },
      { id: "3", title: "Part-Time", value: "Part-Time", type: "type" },
      { id: "4", title: "Freelance", value: "Freelance", type: "type" },
    ],
  },
  {
    id: "2",
    title: "Seniority",
    data: [
      { id: "1", title: "Junior", value: "Junior", type: "seniority" },
      { id: "2", title: "Medior", value: "Medior", type: "seniority" },
      { id: "3", title: "Senior", value: "Senior", type: "seniority" },
      { id: "4", title: "Lead", value: "Lead", type: "seniority" },
    ],
  },
  {
    id: "3",
    title: "Salary Range",
    data: [
      { id: "1", title: "0$ - 50 000$", value: "0-50000", type: "salaryRange" },
      {
        id: "2",
        title: "50 000$ - 100 000$",
        value: "50000-100000",
        type: "salaryRange",
      },
      {
        id: "3",
        title: "100 000$ - 150 000$",
        value: "100000-150000",
        type: "salaryRange",
      },
      {
        id: "4",
        title: "150 000$ - 200 000$",
        value: "150000-200000",
        type: "salaryRange",
      },
      {
        id: "5",
        title: "200 000$ - 500 000$",
        value: "200000-500000",
        type: "salaryRange",
      },
    ],
  },
  {
    id: "4",
    title: "Position",
    data: [
      { id: "1", title: "Hybrid", value: "Hybrid", type: "position" },
      { id: "2", title: "On-Site", value: "On-site", type: "position" },
      { id: "3", title: "Remote", value: "Remote", type: "position" },
    ],
  },
];

// ===============================
// Skills Information Data
// ===============================

export const SkillsInformationsData = [
  // Databases
  {
    id: "1",
    category: "Databases",
    data: [
      { id: "1", title: "MySQL", value: "mysql", type: "skills" },
      { id: "2", title: "PostgreSQL", value: "postgresql", type: "skills" },
      { id: "3", title: "MongoDB", value: "mongodb", type: "skills" },
      { id: "4", title: "SQLite", value: "sqlite", type: "skills" },
      { id: "5", title: "Oracle", value: "oracle", type: "skills" },
      { id: "6", title: "SQL Server", value: "sqlserver", type: "skills" },
      { id: "7", title: "Redis", value: "redis", type: "skills" },
      { id: "8", title: "Cassandra", value: "cassandra", type: "skills" },
      { id: "9", title: "Firebase", value: "firebase", type: "skills" },
      {
        id: "10",
        title: "Elasticsearch",
        value: "elasticsearch",
        type: "skills",
      },
      { id: "11", title: "DynamoDB", value: "dynamodb", type: "skills" },
      { id: "12", title: "Couchbase", value: "couchbase", type: "skills" },
      { id: "13", title: "MariaDB", value: "mariadb", type: "skills" },
      { id: "14", title: "Neo4j", value: "neo4j", type: "skills" },
    ],
  },
  // Programming Languages
  {
    id: "2",
    category: "Programming Languages",
    data: [
      { id: "1", title: "JavaScript", value: "javascript", type: "skills" },
      { id: "2", title: "TypeScript", value: "typescript", type: "skills" },
      { id: "3", title: "C#", value: "csharp", type: "skills" },
      { id: "4", title: "C++", value: "cplusplus", type: "skills" },
      { id: "5", title: "C", value: "c", type: "skills" },
      { id: "6", title: "Node.js", value: "nodejs", type: "skills" },
      { id: "7", title: "Python", value: "python", type: "skills" },
      { id: "8", title: "Java", value: "java", type: "skills" },
      { id: "9", title: "Ruby", value: "ruby", type: "skills" },
      { id: "10", title: "PHP", value: "php", type: "skills" },
      { id: "11", title: "Go", value: "go", type: "skills" },
      { id: "12", title: "Rust", value: "rust", type: "skills" },
      { id: "13", title: "Perl", value: "perl", type: "skills" },
      { id: "14", title: "Scala", value: "scala", type: "skills" },
      { id: "15", title: "Dart", value: "dart", type: "skills" },
      { id: "16", title: "R", value: "r", type: "skills" },
      { id: "17", title: "Haskell", value: "haskell", type: "skills" },
      { id: "18", title: "Erlang", value: "erlang", type: "skills" },
      { id: "19", title: "Elixir", value: "elixir", type: "skills" },
      { id: "20", title: "Assembly", value: "assembly", type: "skills" },
    ],
  },
  // Web Development
  {
    id: "3",
    category: "Web Development",
    data: [
      { id: "1", title: "HTML", value: "html", type: "skills" },
      { id: "2", title: "CSS", value: "css", type: "skills" },
      { id: "3", title: "React", value: "react", type: "skills" },
      { id: "4", title: "Angular", value: "angular", type: "skills" },
      { id: "5", title: "Vue.js", value: "vuejs", type: "skills" },
      { id: "6", title: "Next.js", value: "nextjs", type: "skills" },
      { id: "7", title: "Svelte", value: "svelte", type: "skills" },
      { id: "8", title: "Ember.js", value: "emberjs", type: "skills" },
      { id: "9", title: "Backbone.js", value: "backbonejs", type: "skills" },
      { id: "10", title: "Remix", value: "remix", type: "skills" },
      { id: "11", title: "Express.js", value: "expressjs", type: "skills" },
      { id: "12", title: "Solid.js", value: "solidjs", type: "skills" },
      { id: "13", title: "Nuxt.js", value: "nuxtjs", type: "skills" },
      { id: "14", title: "Material-UI", value: "material-ui", type: "skills" },
      { id: "15", title: "Django", value: "django", type: "skills" },
      { id: "16", title: "Flask", value: "flask", type: "skills" },
      { id: "17", title: "ASP.NET", value: "aspnet", type: "skills" },
      { id: "18", title: "Spring Boot", value: "springboot", type: "skills" },
      { id: "19", title: "Laravel", value: "laravel", type: "skills" },
      { id: "20", title: "Bootstrap", value: "bootstrap", type: "skills" },
      { id: "21", title: "Tailwind CSS", value: "tailwindcss", type: "skills" },
      { id: "22", title: "SASS", value: "sass", type: "skills" },
      { id: "23", title: "jQuery", value: "jquery", type: "skills" },
      { id: "24", title: "WordPress", value: "wordpress", type: "skills" },
      { id: "25", title: "Magento", value: "magento", type: "skills" },
    ],
  },
  // Cloud Platforms
  {
    id: "4",
    category: "Cloud Platforms",
    data: [
      { id: "1", title: "AWS", value: "aws", type: "skills" },
      { id: "2", title: "Microsoft Azure", value: "azure", type: "skills" },
      { id: "3", title: "Google Cloud Platform", value: "gcp", type: "skills" },
      { id: "4", title: "IBM Cloud", value: "ibmcloud", type: "skills" },
      { id: "5", title: "Oracle Cloud", value: "oraclecloud", type: "skills" },
      { id: "6", title: "Heroku", value: "heroku", type: "skills" },
      { id: "7", title: "DigitalOcean", value: "digitalocean", type: "skills" },
      { id: "8", title: "Vercel", value: "vercel", type: "skills" },
      { id: "9", title: "Netlify", value: "netlify", type: "skills" },
      { id: "10", title: "Cloudflare", value: "cloudflare", type: "skills" },
    ],
  },
  // DevOps Tools
  {
    id: "5",
    category: "DevOps Tools",
    data: [
      { id: "1", title: "Docker", value: "docker", type: "skills" },
      { id: "2", title: "Kubernetes", value: "kubernetes", type: "skills" },
      { id: "3", title: "Jenkins", value: "jenkins", type: "skills" },
      { id: "4", title: "Ansible", value: "ansible", type: "skills" },
      { id: "5", title: "Terraform", value: "terraform", type: "skills" },
      { id: "6", title: "GitLab CI/CD", value: "gitlab-ci-cd", type: "skills" },
      { id: "7", title: "Travis CI", value: "travisci", type: "skills" },
      { id: "8", title: "CircleCI", value: "circleci", type: "skills" },
      { id: "9", title: "Puppet", value: "puppet", type: "skills" },
      { id: "10", title: "Chef", value: "chef", type: "skills" },
      { id: "11", title: "Nagios", value: "nagios", type: "skills" },
      { id: "12", title: "Prometheus", value: "prometheus", type: "skills" },
      { id: "13", title: "Grafana", value: "grafana", type: "skills" },
      { id: "14", title: "Splunk", value: "splunk", type: "skills" },
      { id: "15", title: "ELK Stack", value: "elkstack", type: "skills" },
    ],
  },
  // Data Science & Machine Learning
  {
    id: "6",
    category: "Data Science & Machine Learning",
    data: [
      { id: "1", title: "TensorFlow", value: "tensorflow", type: "skills" },
      { id: "2", title: "PyTorch", value: "pytorch", type: "skills" },
      { id: "3", title: "Scikit-Learn", value: "scikit-learn", type: "skills" },
      { id: "4", title: "Keras", value: "keras", type: "skills" },
      { id: "5", title: "Pandas", value: "pandas", type: "skills" },
      { id: "6", title: "NumPy", value: "numpy", type: "skills" },
      { id: "7", title: "Matplotlib", value: "matplotlib", type: "skills" },
      { id: "8", title: "Seaborn", value: "seaborn", type: "skills" },
      { id: "9", title: "Apache Spark", value: "apachespark", type: "skills" },
      { id: "10", title: "Hadoop", value: "hadoop", type: "skills" },
      { id: "11", title: "RapidMiner", value: "rapidminer", type: "skills" },
      { id: "12", title: "Weka", value: "weka", type: "skills" },
      { id: "13", title: "Tableau", value: "tableau", type: "skills" },
      { id: "14", title: "Power BI", value: "powerbi", type: "skills" },
      { id: "15", title: "SAS", value: "sas", type: "skills" },
      { id: "16", title: "BigQuery", value: "bigquery", type: "skills" },
      { id: "17", title: "Databricks", value: "databricks", type: "skills" },
    ],
  },
  // Mobile Development
  {
    id: "7",
    category: "Mobile Development",
    data: [
      { id: "1", title: "Android", value: "android", type: "skills" },
      { id: "2", title: "iOS", value: "ios", type: "skills" },
      { id: "3", title: "React Native", value: "reactnative", type: "skills" },
      { id: "4", title: "Flutter", value: "flutter", type: "skills" },
      { id: "5", title: "Xamarin", value: "xamarin", type: "skills" },
      { id: "6", title: "Swift", value: "swift", type: "skills" },
      { id: "7", title: "Kotlin", value: "kotlin", type: "skills" },
      { id: "8", title: "Objective-C", value: "objective-c", type: "skills" },
      { id: "9", title: "Cordova", value: "cordova", type: "skills" },
      { id: "10", title: "Ionic", value: "ionic", type: "skills" },
      { id: "11", title: "PhoneGap", value: "phonegap", type: "skills" },
    ],
  },
  // Cybersecurity
  {
    id: "8",
    category: "Cybersecurity",
    data: [
      {
        id: "1",
        title: "Penetration Testing",
        value: "pentesting",
        type: "skills",
      },
      {
        id: "2",
        title: "Ethical Hacking",
        value: "ethicalhacking",
        type: "skills",
      },
      {
        id: "3",
        title: "Network Security",
        value: "networksecurity",
        type: "skills",
      },
      { id: "4", title: "Cryptography", value: "cryptography", type: "skills" },
      {
        id: "5",
        title: "Malware Analysis",
        value: "malwareanalysis",
        type: "skills",
      },
      {
        id: "6",
        title: "Security Information and Event Management (SIEM)",
        value: "siem",
        type: "skills",
      },
      {
        id: "7",
        title: "Incident Response",
        value: "incidentresponse",
        type: "skills",
      },
      { id: "8", title: "Firewalls", value: "firewalls", type: "skills" },
      {
        id: "9",
        title: "Intrusion Detection Systems (IDS)",
        value: "ids",
        type: "skills",
      },
      {
        id: "10",
        title: "Identity and Access Management (IAM)",
        value: "iam",
        type: "skills",
      },
      {
        id: "11",
        title: "Security Compliance",
        value: "securitycompliance",
        type: "skills",
      },
      {
        id: "12",
        title: "Data Loss Prevention (DLP)",
        value: "dlp",
        type: "skills",
      },
    ],
  },
  // Project Management
  {
    id: "9",
    category: "Project Management",
    data: [
      { id: "1", title: "Agile Methodology", value: "agile", type: "skills" },
      { id: "2", title: "Scrum", value: "scrum", type: "skills" },
      { id: "3", title: "Kanban", value: "kanban", type: "skills" },
      { id: "4", title: "PRINCE2", value: "prince2", type: "skills" },
      {
        id: "5",
        title: "Stakeholder Management",
        value: "stakeholdermanagement",
        type: "skills",
      },
      {
        id: "6",
        title: "Microsoft Project",
        value: "msproject",
        type: "skills",
      },
      { id: "7", title: "JIRA", value: "jira", type: "skills" },
      { id: "8", title: "Trello", value: "trello", type: "skills" },
      { id: "9", title: "Asana", value: "asana", type: "skills" },
      { id: "10", title: "Basecamp", value: "basecamp", type: "skills" },
    ],
  },
];

export const HowItWorksSeekersData = [
  {
    id: 1,
    title: "Build Your Profile",
    description:
      "Upload your resume, list your skills, and set your preferences.",
    color: "#0084FF",
  },
  {
    id: 2,
    title: "Browse Jobs",
    description:
      "Explore opportunities based on location, experience, and salary.",
    color: "#00D4DB",
  },
  {
    id: 3,
    title: "Apply with One Click",
    description: "Submit applications effortlessly and track your progress.",
    color: "#FBAF35",
  },
];

export const HowItWorksEmployersData = [
  {
    id: 1,
    title: "Post a Job",
    description:
      "Create a detailed job listing with criteria for ideal candidates.",
    color: "#0084FF",
  },
  {
    id: 2,
    title: "Review Candidates",
    description: "Easily view applications and shortlist top candidates.",
    color: "#00D4DB",
  },
  {
    id: 3,
    title: "Track Analytics",
    description: "Track your hiring performance with detailed analytics.",
    color: "#FBAF35",
  },
];

export const FeaturesData = [
  {
    id: 1,
    title: "Advanced Filters",
    description:
      "Refine your search with advanced filters to find jobs or candidates based on location, skills, salary, and more.",
  },
  {
    id: 2,
    title: "Easy Profile Building",
    description:
      "Quickly create a professional profile by uploading your resume and adding key details, or post job listings with ease.",
  },
  {
    id: 3,
    title: "Application Tracking",
    description:
      "Stay organized by tracking the status of your applications or candidate submissions in real-time.",
  },
  {
    id: 4,
    title: "Job Alerts",
    description:
      "Set up personalized job alerts to get notified about new opportunities or candidates that match your criteria.",
  },
  {
    id: 5,
    title: "Employer Dashboard",
    description:
      "Manage job postings, applications, and interview schedules easily with a powerful and user-friendly dashboard.",
  },
  {
    id: 6,
    title: "Explore Profiles",
    description:
      "Browse detailed profiles of job seekers and employers to find the perfect match for your hiring or career goals.",
  },
];

export const BenefitsData = [
  {
    id: 1,
    title: "Intuitive Modern UI/UX",
    description:
      "Navigate with ease thanks to our sleek, intuitive design. Our user interface ensures a smooth experience, whether you're a job seeker exploring opportunities or an employer managing job listings.",
    icon: <Paintbrush />,
    color: "#03F7FF33",
  },
  {
    id: 2,
    title: "Responsive Design",
    description:
      "Access the platform from any device—desktop, tablet, or mobile. Our fully responsive design ensures that your experience is seamless and optimized no matter where you are.",
    icon: <MonitorSmartphone />,
    color: "#FFA70333",
  },
  {
    id: 3,
    title: "Performance",
    description:
      "Enjoy fast, reliable performance, even with large datasets and high traffic. Our platform is optimized to load quickly and function flawlessly, so you can focus on what matters most.",
    icon: <GaugeCircle />,
    color: "#03FF1433",
  },
  {
    id: 4,
    title: "Scalability",
    description:
      "As your hiring or job search needs grow, our platform scales with you. From individual job seekers to large teams of employers, we provide a flexible, scalable solution that adapts to your needs.",
    icon: <Scale3D />,
    color: "#034BFF33",
  },
];

export const EmployerFAQs = [
  {
    id: 1,
    title: "How do I post a job listing?",
    description:
      "To post a job listing, log in to your employer account, navigate to the 'Post a Job' section, and fill out the required details. Your listing will be reviewed and published shortly.",
  },
  {
    id: 2,
    title: "Can I search for candidates instead of waiting for applications?",
    description:
      "Yes, our platform offers a candidate search feature that allows you to actively search and filter profiles based on specific criteria like skills, experience, and location.",
  },
  {
    id: 3,
    title: "What tools are available to help me manage applications?",
    description:
      "We provide tools such as application tracking, filtering, and communication options to help you efficiently manage incoming applications.",
  },
  {
    id: 4,
    title: "Is there a cost to post jobs on the platform?",
    description:
      "Our platform offers both free and premium job posting options. Premium posts provide better visibility and additional features.",
  },
  {
    id: 5,
    title: "Can I create multiple job listings?",
    description:
      "Yes, you can create multiple job listings. Our platform supports both individual postings and bulk uploads for larger requirements.",
  },
];

export const JobSeekerFAQs = [
  {
    id: 1,
    title: "How do I create a profile on the platform?",
    description:
      "Creating a profile is simple: sign up, fill in your details like education, experience, and skills, and upload your resume to complete your profile.",
  },
  {
    id: 2,
    title: "Can I apply to multiple jobs at the same time?",
    description:
      "Yes, you can apply to multiple jobs. Simply navigate to each job listing and submit your application with a few clicks.",
  },
  {
    id: 3,
    title: "How do job alerts work?",
    description:
      "Set up job alerts by selecting your preferred job criteria. You'll receive email notifications whenever new jobs matching your criteria are posted.",
  },
  {
    id: 4,
    title: "Is the platform free for job seekers?",
    description:
      "Yes, our platform is completely free for job seekers, including features like job applications, alerts, and profile creation.",
  },
  {
    id: 5,
    title: "How can I track my application status?",
    description:
      "You can track your application status in your dashboard, which provides updates such as 'Under Review,' 'Interview Scheduled,' or 'Hired.'",
  },
];

export const GeneralPlatformFAQs = [
  {
    id: 1,
    title: "Is this platform focused only on tech jobs?",
    description:
      "No, while we cater to tech professionals, our platform also hosts job opportunities across various industries and domains.",
  },
  {
    id: 2,
    title: "Can I access the platform on mobile devices?",
    description:
      "Absolutely! Our platform is fully responsive and can be accessed seamlessly from mobile devices, tablets, and desktops.",
  },
  {
    id: 3,
    title: "What makes this platform different from general job boards?",
    description:
      "Our platform combines modern UI/UX, powerful search tools, and tailored features to provide a superior experience for both job seekers and employers.",
  },
  {
    id: 4,
    title: "How is my data protected?",
    description:
      "We prioritize your privacy and security by implementing robust encryption protocols, secure servers, and compliance with global data protection standards.",
  },
  {
    id: 5,
    title: "How do I contact support if I have an issue?",
    description:
      "You can reach out to our support team via the 'Contact Us' page or through in-app chat. We’re here to help with any issues or inquiries.",
  },
];
