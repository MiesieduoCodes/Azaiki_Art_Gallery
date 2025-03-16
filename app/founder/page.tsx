'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaBook, FaAward, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';

// Define types for the profile data
type SocialLinks = {
  email: string;
  linkedin: string;
  twitter: string;
};

type Profile = {
  name: string;
  title: string;
  profileImage: string;
  coverImage: string;
  socialLinks: SocialLinks;
  biography: string;
};

type Education = {
  degree: string;
  institution?: string;
  year: number | string;
};

type WorkExperience = {
  role: string;
  institution: string;
  period: string;
};

type Appointment = {
  role: string;
  institution: string;
  period: string;
};

type CommunityService = {
  activity: string;
  year: number | string;
};

type Activity = {
  role: string;
  organization: string;
  period: string;
};

type Politics = {
  role: string;
  institution: string;
  period: string;
};

type DirectorPosition = {
  role: string;
  institution: string;
};

type ProfileData = {
  profile: Profile;
  education: Education[];
  workExperience: WorkExperience[];
  appointments: Appointment[];
  communityService: CommunityService[];
  activities: Activity[];
  politics: Politics[];
  directorPositions: DirectorPosition[];
};

// Full profile data
const profileData: ProfileData = {
  profile: {
    name: 'Professor Steve Azaiki',
    title: 'Scholar, Author, and Statesman',
    profileImage: '/images/Prof-Steve-Portrait.jpg',
    coverImage: '/images/IMG-20250207-WA0040.jpg',
    socialLinks: {
      email: 'mailto:professor.steve@university.com',
      linkedin: 'https://www.linkedin.com/in/steveazaiki/',
      twitter: 'https://twitter.com/profsteveazaiki',
    },
    biography: `Professor Steve Azaiki is a distinguished scholar, author, and statesman with a remarkable career spanning academia, public service, and community development. His contributions to education, agriculture, and governance have left an indelible mark on Nigeria and beyond. With a passion for lifelong learning, he has earned multiple advanced degrees and continues to inspire through his leadership and dedication to societal progress.`,
  },
  education: [
    { degree: 'D.Sc. in Personnel Management', year: 2021 },
    { degree: 'PhD in Personnel Management', year: 2017 },
    { degree: 'MBA in Project Management', institution: 'Federal University of Technology, Owerri (FUTO)', year: 2001 },
    { degree: 'PhD in Agriculture (Biological Sciences)', institution: 'Ukrainian Agricultural University, Kiev', year: 1991 },
    { degree: 'M.Sc. in Agronomy (Plant Protection)', institution: 'Ukrainian Agricultural University, Kiev', year: 1986 },
    { degree: 'Grade 1 Certificate', year: 1979 },
  ],
  workExperience: [
    { role: 'Adjunct Professor of Agriculture (Agronomy)', institution: 'University of Life and Environmental Sciences, Kiev, Ukraine', period: 'Present' },
    { role: 'National Director', institution: 'National Directorate of Employment (NDE), Abuja', period: '2007–2010' },
    { role: 'Pioneer Commissioner for Agriculture', institution: 'Bayelsa State', period: '1997–1999' },
  ],
  appointments: [
    { role: 'Pro-Chancellor and Chairman, Governing Council', institution: 'Niger Delta University', period: '2017–2018' },
    { role: 'Member, Governing Council', institution: 'Niger Delta University, Bayelsa State', period: '2013–2016' },
    { role: 'Honorary Special Adviser on Education and Capacity Building', institution: 'Bayelsa State Government', period: '2010–2015' },
    { role: 'Honorary Special Adviser on Agriculture', institution: 'Bayelsa State Government', period: '2013' },
    { role: 'Member, Governing Council', institution: 'Federal University of Technology, Akure', period: '2009–2012' },
    { role: 'Secretary to the Bayelsa State Government', institution: 'Bayelsa State Government', period: '2002–2003, reappointed 2003–2006' },
  ],
  communityService: [
    { activity: 'Established the Institute of Science and Technology, Yenagoa', year: 2015 },
    { activity: 'Built Azaiki Museum of Niger Delta and African Arts', year: 2015 },
    { activity: 'Built Azaiki Public Library', year: '2010/2011' },
    { activity: 'Built Yenebebeli Anglican Church', year: '2010/2011' },
    { activity: 'Built St. Andrew Primary School, Yenebebeli', year: '1998/1999' },
  ],
  activities: [
    { role: 'Founder and Coordinator', organization: 'National Think Tank Nigeria (NTTN)', period: '2007–present' },
    { role: 'President', organization: 'Global Organization of Parliamentarians Against Corruption (GOPAC), Nigeria', period: '2019–2023' },
    { role: 'Vice Chairman', organization: 'World Bank/IMF Parliamentary Network', period: '2021–2023' },
    { role: 'President', organization: 'International Society of Comparative Education, Science, and Technology (ISCEST), Nigeria', period: '2014–2017' },
    { role: 'President', organization: 'World Environmental Foundation for Africa (WEMFFA)', period: '1993–2003' },
  ],
  politics: [
    { role: 'Honourable Member (9th National Assembly)', institution: 'House of Representatives, Yenagoa/Kolokuma-Opokuma Federal Constituency, Bayelsa State', period: '2019–2023' },
  ],
  directorPositions: [
    { role: 'Board Member', institution: 'Sovereign Trust Insurance Plc' },
    { role: 'Board Member', institution: 'Bayelsa State Development & Investment Cooperation (BDIC)' },
    { role: 'Board Member', institution: 'Bayelsa State Agricultural Development Board' },
  ],
};

const Page = () => {
  const { profile, education, workExperience, appointments, communityService, activities, politics, directorPositions } = profileData;
  const { profileImage, coverImage, name, title, socialLinks, biography } = profile;

  return (
    <div className="text-blue-900 min-h-screen bg-white">
      {/* Cover Section */}
      <motion.div className="relative bg-cover pt-24 bg-center bg-no-repeat text-white py-32 w-full shadow-lg" style={{ backgroundImage: `url(${coverImage})` }}>
        <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center relative z-10">
          <motion.div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-blue-300">
            <Image src={profileImage} alt={name} width={160} height={160} className="object-cover w-full h-full" />
          </motion.div>
          <motion.h1 className="text-5xl font-extrabold mt-6 text-center">{name}</motion.h1>
          <motion.p className="mt-3 text-lg italic text-center">{title}</motion.p>
          <motion.div className="mt-6 flex space-x-6">
            <a href={socialLinks.email}><FaEnvelope className="text-blue-300 text-3xl hover:text-blue-200 transition-colors" /></a>
            <a href={socialLinks.linkedin}><FaLinkedin className="text-blue-300 text-3xl hover:text-blue-200 transition-colors" /></a>
            {/* <a href={socialLinks.twitter}><FaSquareXTwitter className="text-blue-300 text-3xl hover:text-blue-200 transition-colors" /></a> */}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Biography Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Biography</h2>
          <p className="text-lg text-blue-600 mb-6">{biography}</p>
        </motion.section>

        {/* Education Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Education</h2>
          <p className="text-lg text-blue-500 mb-6">Professor Azaiki's academic journey reflects his commitment to lifelong learning and excellence.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{edu.degree}</h3>
                {edu.institution && <p className="text-blue-100 mt-2">{edu.institution}</p>}
                <p className="text-blue-300 mt-2">{edu.year}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Work Experience Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Work Experience</h2>
          <p className="text-lg text-blue-500 mb-6">A distinguished career spanning academia, public service, and governance.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workExperience.map((exp, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{exp.role}</h3>
                <p className="text-blue-100 mt-2">{exp.institution}</p>
                <p className="text-blue-300 mt-2">{exp.period}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Appointments Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Appointments</h2>
          <p className="text-lg text-blue-500 mb-6">Key leadership roles in education and governance.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((app, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{app.role}</h3>
                <p className="text-blue-100 mt-2">{app.institution}</p>
                <p className="text-blue-300 mt-2">{app.period}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Community Service Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Community Service</h2>
          <p className="text-lg text-blue-500 mb-6">Contributions to community development and nation-building.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityService.map((service, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{service.activity}</h3>
                <p className="text-blue-300 mt-2">{service.year}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Activities Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Activities</h2>
          <p className="text-lg text-blue-500 mb-6">Leadership in global and national organizations.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{act.role}</h3>
                <p className="text-blue-100 mt-2">{act.organization}</p>
                <p className="text-blue-300 mt-2">{act.period}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Politics Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Politics</h2>
          <p className="text-lg text-blue-500 mb-6">Service in the Nigerian National Assembly.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {politics.map((pol, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{pol.role}</h3>
                <p className="text-blue-100 mt-2">{pol.institution}</p>
                <p className="text-blue-300 mt-2">{pol.period}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Director Positions Section */}
        <motion.section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Director Positions</h2>
          <p className="text-lg text-blue-500 mb-6">Board memberships in key organizations.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {directorPositions.map((dir, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-200">{dir.role}</h3>
                <p className="text-blue-100 mt-2">{dir.institution}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Page;