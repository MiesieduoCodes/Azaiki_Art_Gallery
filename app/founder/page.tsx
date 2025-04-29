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
    profileImage: 'https://www.parlnet.org/wp-content/uploads/2021/10/Steve-2.jpg',
    coverImage: '/images/IMG-20250314-WA0036.jpg',
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
    <div className="text-gray-800 min-h-screen bg-white">
      {/* Cover Section */}
      <motion.div className="relative pt-36 pb-10 bg-cover bg-center bg-no-repeat text-white py-32 w-full shadow-lg" style={{ backgroundImage: `url(${coverImage})` }}>
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
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Biography Section */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">Biography</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{biography}</p>
          
          {/* Founder Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/images/Founder1.jpg" 
                alt="Prof. Azaiki delivering a keynote address"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-sm">Delivering a keynote address on education reform</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/images/Founder2.jpg" 
                alt="Prof. Azaiki receiving an academic award"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-sm">Receiving the Distinguished Scholar Award</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">Academic Journey</h2>
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">PROF. STEPHEN SINIKIEM AZAIKI, PhD, OON</h3>
            <h4 className="text-xl font-medium text-blue-600 mb-6">Professor of Agronomy | Conflict Resolution/Policy Expert | Development Advocate</h4>
            
            <p className="mb-4 leading-relaxed">
              Professor Stephen Sinikiem Azaiki is a distinguished academic, public servant, and development advocate with extensive experience in education, governance, and community development. His academic journey reflects an unrelenting pursuit of knowledge and excellence across multiple disciplines.
            </p>
            
            <p className="mb-4 leading-relaxed">
              He holds multiple advanced degrees, including:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>D.Sc. in Personnel Management</strong> (2021)</li>
              <li><strong>PhD in Personnel Management</strong> (2017)</li>
              <li><strong>MBA in Project Management</strong> from Federal University of Technology, Owerri (FUTO) (2001)</li>
              <li><strong>PhD in Agriculture (Biological Sciences)</strong> from Ukrainian Agricultural University, Kiev (1991)</li>
              <li><strong>M.Sc. in Agronomy (Plant Protection)</strong> from Ukrainian Agricultural University, Kiev (1986)</li>
            </ul>
            
            <p className="mb-4 leading-relaxed">
              His academic journey has taken him to prestigious institutions worldwide including Harvard University, Oxford University, and the Wharton School of University of Pennsylvania for specialized training and fellowships. This global exposure has enriched his perspective and approach to problem-solving in the Nigerian context.
            </p>
            
            <p className="mb-4 leading-relaxed">
              Professor Azaiki's academic philosophy emphasizes the practical application of knowledge. His research has focused on agricultural development, personnel management, and education policy - areas where he has made significant contributions through publications, policy recommendations, and institutional development.
            </p>
            
            <p className="leading-relaxed">
              His commitment to education extends beyond formal degrees. He has participated in numerous executive education programs and has been a visiting scholar at several institutions, sharing his expertise while continuously expanding his own knowledge base.
            </p>
          </div>
        </motion.section>

        {/* Work Experience Section - Long Form */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">Professional Experience</h2>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 leading-relaxed">
              Professor Azaiki's professional journey reflects his versatility and commitment to national development through various leadership roles:
            </p>
            
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Academic Appointments</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Adjunct Professor of Agriculture (Agronomy)</strong> at University of Life and Environmental Sciences, Kiev, Ukraine (Present)</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Public Service</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>National Director</strong> of National Directorate of Employment (NDE), Abuja (2007–2010)</li>
              <li><strong>Pioneer Commissioner for Agriculture</strong> in Bayelsa State (1997–1999)</li>
            </ul>
          </div>
        </motion.section>

        {/* Appointments Section - Long Form */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">Key Appointments</h2>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 leading-relaxed">
              Professor Azaiki has served in several strategic leadership positions that have influenced policy and institutional development:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pro-Chancellor and Chairman, Governing Council</strong> of Niger Delta University (2017–2018)</li>
              <li><strong>Member, Governing Council</strong> of Niger Delta University, Bayelsa State (2013–2016)</li>
              <li><strong>Honorary Special Adviser on Education and Capacity Building</strong> to Bayelsa State Government (2010–2015)</li>
              <li><strong>Honorary Special Adviser on Agriculture</strong> to Bayelsa State Government (2013)</li>
              <li><strong>Member, Governing Council</strong> of Federal University of Technology, Akure (2009–2012)</li>
              <li><strong>Secretary to the Bayelsa State Government</strong> (2002–2003, reappointed 2003–2006)</li>
            </ul>
          </div>
        </motion.section>

        {/* Additional Images Section */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/images/Founder3.jpg" 
                alt="Prof. Azaiki in a policy meeting"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-sm">Chairing an education policy meeting</p>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/images/Founder4.jpg" 
                alt="Prof. Azaiki in agricultural field visit"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-sm">Field visit to agricultural project</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Page;