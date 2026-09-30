const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

/* ---------- Mobile navigation ---------- */
const menuBtn=$('.menu-btn'), nav=$('.nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

/* ---------- Accordion ---------- */
$$('.acc-item button').forEach(btn=>btn.addEventListener('click',()=>{
  const item=btn.parentElement;
  $$('.acc-item').forEach(x=>{if(x!==item)x.classList.remove('open')});
  item.classList.toggle('open');
}));

/* ---------- Ultra-smooth reveal: observer only, no per-element timers ---------- */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
},{threshold:.08, rootMargin:'0px 0px -6% 0px'});
$$('.reveal').forEach(el=>observer.observe(el));

/* ---------- Lightbox ---------- */
const lightbox=$('#lightbox'), lightboxImg=$('#lightboxImg');
function showImage(src){lightboxImg.src=src;lightbox.classList.add('show');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll')}
function hideImage(){lightbox.classList.remove('show');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}
$$('[data-img]').forEach(el=>el.addEventListener('click',()=>showImage(el.dataset.img)));
$('.close-lightbox')?.addEventListener('click',hideImage);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)hideImage()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideImage()});

/* ---------- Admission → WhatsApp ---------- */
const form=$('#admissionForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const msg=`Genius Kindergarten School - Admission Inquiry%0A%0AStudent: ${encodeURIComponent(data.get('student'))}%0AGuardian: ${encodeURIComponent(data.get('guardian'))}%0APhone: ${encodeURIComponent(data.get('phone'))}%0AClass: ${encodeURIComponent(data.get('class'))}%0AMessage: ${encodeURIComponent(data.get('message')||'N/A')}`;
  window.open(`https://wa.me/8801723255186?text=${msg}`,'_blank','noopener');
});
$('#year').textContent=new Date().getFullYear();

/* ---------- Language system: Bangla / English ---------- */
const T={
 bn:{
  'nav.home':'হোম','nav.about':'আমাদের সম্পর্কে','nav.courses':'কোর্স','nav.teachers':'শিক্ষক','nav.notice':'নোটিশ','nav.gallery':'গ্যালারি','nav.admission':'ভর্তি','nav.contact':'যোগাযোগ',
  'hero.eyebrow':'Sirajganj • Bangladesh','hero.title':'যেখান থেকে <em>স্বপ্ন</em> শুরু হয়।','hero.lead':'GENIUS KINDERGARTEN SCHOOL','hero.desc':'শিশুর কৌতূহলকে শক্তিতে, চরিত্রকে মূল্যবোধে এবং শেখাকে আত্মবিশ্বাসে রূপ দেওয়ার একটি নিরাপদ ও আনন্দময় শিক্ষাঙ্গন।','hero.admit':'🎓 ভর্তি সম্পর্কে জানুন','hero.gallery':'📸 আমাদের মুহূর্তগুলো','stat.classes':'শ্রেণি','stat.arabic':'বিশেষ শিক্ষা','stat.child':'শিশু-কেন্দ্রিক','float.learn':'Learn','float.learnSub':'Explore every day','float.grow':'Grow','float.growSub':'Character & confidence','float.lead':'Lead','float.leadSub':'Dream bigger',
  'about.tag':'ABOUT OUR SCHOOL','about.title':'Learn • Grow • Discover • Lead','about.sub':'Where Young Minds Begin Their Journey to Greatness.','about.text':'At Genius Kindergarten School, we believe every child has the potential to achieve something extraordinary. We create a safe, caring, and inspiring learning environment where children are encouraged to explore, discover, learn, and grow with confidence.','about.safe':'🛡️ Safe & Caring','about.safeSub':'শিশুর নিরাপত্তা ও যত্নকে অগ্রাধিকার','about.curious':'💡 Curious Learning','about.curiousSub':'প্রশ্ন, অনুসন্ধান ও সৃজনশীলতা','about.character':'❤️ Strong Character','about.characterSub':'শিষ্টাচার, সততা ও মানবিকতা','about.founder':'Founder','about.caption':'শিশুদের আনন্দময় শিক্ষাজীবনের কিছু মুহূর্ত',
  'courses.tag':'ACADEMIC PROGRAM','courses.title':'কোর্স ও বিষয়সমূহ','courses.sub':'শিশুর বয়স ও শ্রেণি অনুযায়ী ধাপে ধাপে শেখার পরিবেশ।','course.play':'খেলা, ভাষা, সামাজিকতা ও প্রাথমিক শেখার ভিত্তি।','course.nursery':'ভাষা, সংখ্যা, সৃজনশীলতা ও দৈনন্দিন দক্ষতা।','course.12':'বাংলা, English, গণিত, বিজ্ঞান ও নৈতিক শিক্ষা।','course.35':'মূল বিষয়, অনুশীলন, পরীক্ষা প্রস্তুতি ও সৃজনশীল শিক্ষা।','course.arabic':'আরবি ভাষা ও ধর্মীয় শিক্ষার সহায়ক পাঠ।','course.activity':'খেলাধুলা, সাংস্কৃতিক কার্যক্রম, অনুষ্ঠান ও দলগত কাজ।','course.foundation':'Foundation','course.early':'Early Years','course.primary':'Primary','course.primaryplus':'Primary Plus','course.special':'Special Program','course.beyond':'Beyond Classroom',
  'teachers.tag':'PROFESSIONAL TEACHER','teachers.title':'আমাদের শিক্ষকবৃন্দ 📚','teachers.sub':'শিক্ষার্থীদের পাশে থাকা নিবেদিত শিক্ষক ও সহকারী শিক্ষকবৃন্দ।',
  'notice.tag':'NOTICE BOARD','notice.title':'নোটিশ ও গুরুত্বপূর্ণ নির্দেশনা','notice.sub':'“اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ” — পড় তোমার প্রভুর নামে, যিনি তোমাকে সৃষ্টি করেছেন।','notice.zoom':'🔍 বড় করে দেখুন','notice.parents':'👨‍👩‍👧 অভিভাবকদের প্রতি আহ্বান','notice.teachers':'👩‍🏫 একজন আদর্শ শিক্ষকের গুণাবলী','notice.students':'🎒 ছাত্র-ছাত্রীদের পালনীয় বিষয়সমূহ',
  'events.tag':'NOTICE & EVENTS','events.title':'স্কুলের কার্যক্রম ও অর্জন','events.sub':'শিক্ষা শুধু শ্রেণিকক্ষে নয়—অভিজ্ঞতা, আনন্দ ও সম্মিলিত অংশগ্রহণেও শেখা হয়।','event.parent':'অভিভাবক সমাবেশ ও পুরস্কার প্রদান','event.parentDesc':'শিক্ষার্থী, অভিভাবক ও শিক্ষক—একসঙ্গে শেখা ও উদযাপনের মুহূর্ত।','event.award':'শিক্ষার্থীদের সম্মাননা','event.awardDesc':'পরিশ্রম, অংশগ্রহণ ও সাফল্যকে উৎসাহিত করার উদ্যোগ।','event.activity':'শিক্ষার্থী ও সাংস্কৃতিক কার্যক্রম','event.activityDesc':'দলগত কাজ, আনন্দ এবং আত্মবিশ্বাস তৈরির পরিবেশ।',
  'gallery.tag':'SCHOOL GALLERY','gallery.title':'আমাদের স্মৃতির অ্যালবাম 📸','gallery.sub':'আপনার দেওয়া স্কুলের আসল ছবি দিয়ে তৈরি গ্যালারি।',
  'resources.tag':'STUDENT RESOURCES','resources.title':'শিক্ষার্থীদের জন্য সহায়ক জোন','resources.sub':'নিয়মিত পড়াশোনা, অনুশীলন ও ভালো অভ্যাসের জন্য।','resource.daily':'প্রতিদিনের পাঠ বুঝে নেওয়া ও অনুশীলনের অভ্যাস।','resource.exam':'পরীক্ষার আগে পুনরাবৃত্তি ও প্রস্তুতির পরিকল্পনা।','resource.creative':'আঁকা, গল্প, হাতের কাজ ও সৃজনশীল প্রকাশ।','resource.play':'খেলাধুলা ও শারীরিক সক্রিয়তার মাধ্যমে সুস্থতা।',
  'admission.tag':'ADMISSION 2026','admission.title':'আপনার শিশুর সুন্দর আগামী শুরু হোক আজ থেকেই।','admission.desc':'অনলাইন ফর্মটি পূরণ করলে WhatsApp-এ আপনার তথ্য প্রস্তুত হয়ে যাবে। স্কুল কর্তৃপক্ষের সঙ্গে সরাসরি কথা বলুন।','admission.easy':'✓ সহজ যোগাযোগ','admission.child':'✓ শিশুকেন্দ্রিক পরিবেশ','admission.parent':'✓ অভিভাবক সহযোগিতা','form.student':'শিক্ষার্থীর নাম','form.guardian':'অভিভাবকের নাম','form.phone':'মোবাইল নম্বর','form.class':'শ্রেণি','form.message':'বার্তা','form.studentPh':'নাম লিখুন','form.guardianPh':'অভিভাবকের নাম','form.phonePh':'01XXXXXXXXX','form.messagePh':'আপনার প্রশ্ন বা প্রয়োজনীয় তথ্য','form.send':'💬 WhatsApp-এ পাঠান','form.note':'ফর্মটি কোনো সার্ভারে তথ্য সংরক্ষণ করে না।',
  'contact.tag':'CONTACT','contact.title':'যোগাযোগ করুন','contact.sub':'ভর্তি, ক্লাস, নোটিশ বা যেকোনো তথ্যের জন্য আমাদের সঙ্গে কথা বলুন।','contact.founder':'Founder Mobile','contact.whatsapp':'WhatsApp','contact.chat':'Chat on WhatsApp','contact.email':'Email','contact.location':'Location','contact.map':'🗺️ Google Maps-এ খুলুন','contact.facebook':'f  Facebook Page','footer.rights':'All rights reserved.','light.close':'Close'
 },
 en:{
  'nav.home':'Home','nav.about':'About','nav.courses':'Courses','nav.teachers':'Teachers','nav.notice':'Notice','nav.gallery':'Gallery','nav.admission':'Admission','nav.contact':'Contact',
  'hero.eyebrow':'Sirajganj • Bangladesh','hero.title':'Where <em>dreams</em> begin.','hero.lead':'GENIUS KINDERGARTEN SCHOOL','hero.desc':'A safe and joyful learning environment where curiosity becomes strength, character becomes values, and learning becomes confidence.','hero.admit':'🎓 Explore Admission','hero.gallery':'📸 View Our Moments','stat.classes':'Classes','stat.arabic':'Special learning','stat.child':'Child-centered','float.learn':'Learn','float.learnSub':'Explore every day','float.grow':'Grow','float.growSub':'Character & confidence','float.lead':'Lead','float.leadSub':'Dream bigger',
  'about.tag':'ABOUT OUR SCHOOL','about.title':'Learn • Grow • Discover • Lead','about.sub':'Where Young Minds Begin Their Journey to Greatness.','about.text':'At Genius Kindergarten School, we believe every child has the potential to achieve something extraordinary. We create a safe, caring, and inspiring learning environment where children are encouraged to explore, discover, learn, and grow with confidence.','about.safe':'🛡️ Safe & Caring','about.safeSub':'Children’s safety and care come first','about.curious':'💡 Curious Learning','about.curiousSub':'Questions, discovery and creativity','about.character':'❤️ Strong Character','about.characterSub':'Respect, honesty and humanity','about.founder':'Founder','about.caption':'Moments from our children’s joyful learning journey',
  'courses.tag':'ACADEMIC PROGRAM','courses.title':'Courses & Subjects','courses.sub':'A step-by-step learning environment for every age and class.','course.play':'Play, language, social skills and early learning foundations.','course.nursery':'Language, numbers, creativity and everyday skills.','course.12':'Bangla, English, Mathematics, Science and moral education.','course.35':'Core subjects, practice, exam preparation and creative learning.','course.arabic':'Arabic language and supportive religious studies.','course.activity':'Sports, cultural activities, events and teamwork.','course.foundation':'Foundation','course.early':'Early Years','course.primary':'Primary','course.primaryplus':'Primary Plus','course.special':'Special Program','course.beyond':'Beyond Classroom',
  'teachers.tag':'PROFESSIONAL TEACHER','teachers.title':'Our Teachers 📚','teachers.sub':'Dedicated teachers and assistants supporting every learner.',
  'notice.tag':'NOTICE BOARD','notice.title':'Notice & Important Guidelines','notice.sub':'“اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ” — Read in the name of your Lord who created you.','notice.zoom':'🔍 View Larger','notice.parents':'👨‍👩‍👧 A Message to Parents','notice.teachers':'👩‍🏫 Qualities of an Ideal Teacher','notice.students':'🎒 Student Guidelines',
  'events.tag':'NOTICE & EVENTS','events.title':'School Activities & Achievements','events.sub':'Learning happens beyond the classroom through experience, joy and participation.','event.parent':'Parent Meeting & Award Ceremony','event.parentDesc':'A moment of learning and celebration with students, parents and teachers.','event.award':'Student Recognition','event.awardDesc':'Encouraging effort, participation and achievement.','event.activity':'Student & Cultural Activities','event.activityDesc':'A space for teamwork, joy and confidence-building.',
  'gallery.tag':'SCHOOL GALLERY','gallery.title':'Our Memory Album 📸','gallery.sub':'A gallery built with the real school photos you provided.',
  'resources.tag':'STUDENT RESOURCES','resources.title':'Student Resource Zone','resources.sub':'Helpful habits for regular study, practice and growth.','resource.daily':'Understand daily lessons and build a practice habit.','resource.exam':'Revision and preparation planning before exams.','resource.creative':'Drawing, stories, crafts and creative expression.','resource.play':'Health through sports and physical activity.',
  'admission.tag':'ADMISSION 2026','admission.title':'Start your child’s brighter tomorrow today.','admission.desc':'Fill out the form and your inquiry will be prepared for WhatsApp. Speak directly with the school.','admission.easy':'✓ Easy communication','admission.child':'✓ Child-centered environment','admission.parent':'✓ Parent support','form.student':'Student name','form.guardian':'Guardian name','form.phone':'Mobile number','form.class':'Class','form.message':'Message','form.studentPh':'Enter student name','form.guardianPh':'Enter guardian name','form.phonePh':'01XXXXXXXXX','form.messagePh':'Your question or required information','form.send':'💬 Send via WhatsApp','form.note':'This form does not store information on a server.',
  'contact.tag':'CONTACT','contact.title':'Get in Touch','contact.sub':'Talk to us about admission, classes, notices or any information.','contact.founder':'Founder Mobile','contact.whatsapp':'WhatsApp','contact.chat':'Chat on WhatsApp','contact.email':'Email','contact.location':'Location','contact.map':'🗺️ Open in Google Maps','contact.facebook':'f  Facebook Page','footer.rights':'All rights reserved.','light.close':'Close'
 }
};

const textMap={
 '[data-i18n="hero.eyebrow"]':'hero.eyebrow','h1':'hero.title','.hero-lead':'hero.lead','.hero-copy>p:not(.hero-lead)':'hero.desc',
 '.hero-actions .btn-primary':'hero.admit','.hero-actions .btn-ghost':'hero.gallery','.mini-stats span:nth-child(1) small':'stat.classes','.mini-stats span:nth-child(2) small':'stat.arabic','.mini-stats span:nth-child(3) small':'stat.child',
 '.fc-one b':'float.learn','.fc-one small':'float.learnSub','.fc-two b':'float.grow','.fc-two small':'float.growSub','.fc-three b':'float.lead','.fc-three small':'float.leadSub',
 '#about .section-head>span':'about.tag','#about .section-head h2':'about.title','#about .section-head p':'about.sub','#about .about-copy>p':'about.text','.about-points div:nth-child(1) b':'about.safe','.about-points div:nth-child(1) small':'about.safeSub','.about-points div:nth-child(2) b':'about.curious','.about-points div:nth-child(2) small':'about.curiousSub','.about-points div:nth-child(3) b':'about.character','.about-points div:nth-child(3) small':'about.characterSub','.founder small':'about.founder','.image-caption':'about.caption',
 '#courses .section-head>span':'courses.tag','#courses .section-head h2':'courses.title','#courses .section-head p':'courses.sub','#courses .course:nth-child(1) p':'course.play','#courses .course:nth-child(2) p':'course.nursery','#courses .course:nth-child(3) p':'course.12','#courses .course:nth-child(4) p':'course.35','#courses .course:nth-child(5) p':'course.arabic','#courses .course:nth-child(6) p':'course.activity','#courses .course:nth-child(1) span':'course.foundation','#courses .course:nth-child(2) span':'course.early','#courses .course:nth-child(3) span':'course.primary','#courses .course:nth-child(4) span':'course.primaryplus','#courses .course:nth-child(5) span':'course.special','#courses .course:nth-child(6) span':'course.beyond',
 '#teachers .section-head>span':'teachers.tag','#teachers .section-head h2':'teachers.title','#teachers .section-head p':'teachers.sub',
 '#notice .section-head>span':'notice.tag','#notice .section-head h2':'notice.title','#notice .section-head p':'notice.sub','.lightbox-btn':'notice.zoom','.acc-item:nth-child(1) button':'notice.parents','.acc-item:nth-child(2) button':'notice.teachers','.acc-item:nth-child(3) button':'notice.students',
 '#events .section-head>span':'events.tag','#events .section-head h2':'events.title','#events .section-head p':'events.sub','#events .event-card:nth-child(1) h3':'event.parent','#events .event-card:nth-child(1) p':'event.parentDesc','#events .event-card:nth-child(2) h3':'event.award','#events .event-card:nth-child(2) p':'event.awardDesc','#events .event-card:nth-child(3) h3':'event.activity','#events .event-card:nth-child(3) p':'event.activityDesc',
 '#gallery .section-head>span':'gallery.tag','#gallery .section-head h2':'gallery.title','#gallery .section-head p':'gallery.sub',
 '.resources .section-head>span':'resources.tag','.resources .section-head h2':'resources.title','.resources .section-head p':'resources.sub','.resource:nth-child(1) p':'resource.daily','.resource:nth-child(2) p':'resource.exam','.resource:nth-child(3) p':'resource.creative','.resource:nth-child(4) p':'resource.play',
 '#admission .section-tag':'admission.tag','#admission h2':'admission.title','#admission .admission-copy>p':'admission.desc','.admission-points span:nth-child(1)':'admission.easy','.admission-points span:nth-child(2)':'admission.child','.admission-points span:nth-child(3)':'admission.parent',
 '#contact .section-head>span':'contact.tag','#contact .section-head h2':'contact.title','#contact .section-head p':'contact.sub','.contact-row:nth-child(1) small':'contact.founder','.contact-row:nth-child(2) small':'contact.whatsapp','.contact-row:nth-child(2) a':'contact.chat','.contact-row:nth-child(3) small':'contact.email','.contact-row:nth-child(4) small':'contact.location','.map-link':'contact.map','.facebook':'contact.facebook','.lightbox .close-lightbox':'light.close'
};

const labelMap=[['label:nth-child(1)','form.student','form.studentPh','Enter student name'],['label:nth-child(2)','form.guardian','form.guardianPh','Enter guardian name'],['label:nth-child(3)','form.phone','form.phonePh','01XXXXXXXXX'],['label:nth-child(4)','form.class',null,null],['label:nth-child(5)','form.message','form.messagePh','Your question or required information']];
function setLabelText(lang){
  const labels=$$('#admissionForm label');
  labelMap.forEach(([sel,key,ph])=>{
    const label=labels[labelMap.findIndex(x=>x[0]===sel)]; if(!label)return;
    label.childNodes[0].nodeValue=(T[lang][key]||'')+' ';
    const input=label.querySelector('input,textarea'); if(input&&ph) input.placeholder=T[lang][ph]||'';
    if(lang==='bn' && key==='form.student') label.childNodes[0].nodeValue=T.bn[key]+' ';
  });
  const select=labels[3]?.querySelector('select');
  if(select){
    const opts=lang==='bn'?['Play Group','Nursery','Class 1','Class 2','Class 3','Class 4','Class 5','Arabic']:['Play Group','Nursery','Class 1','Class 2','Class 3','Class 4','Class 5','Arabic'];
    [...select.options].forEach((o,i)=>o.textContent=opts[i]);
  }
}
function setLang(lang,save=true){
  const dict=T[lang]||T.bn;
  document.documentElement.lang=lang;
  Object.entries(textMap).forEach(([sel,key])=>{$$(sel).forEach(el=>{el.innerHTML=dict[key]??''})});
  setLabelText(lang);
  setNoticeLanguage(lang);
  $('#admissionForm small').textContent=dict['form.note'];
  $('#languageSelect').value=lang;
  if(save)localStorage.setItem('gks-language',lang);
}

const noticeLists={
  bn:{
    parents:['আপনার সন্তান সময়মতো বিদ্যালয়ে যায় কি না নিশ্চিত করুন।','স্কুল থেকে কখন বাসায় ফিরে তা খেয়াল রাখুন।','প্রতিটি পরীক্ষায় অংশগ্রহণ করেছে কি না নিশ্চিত করুন।','বাড়ির কাজ ও পরীক্ষার খাতা নিয়মিত দেখুন এবং প্রয়োজনীয় সহায়তা দিন।','শ্রেণি শিক্ষকের সঙ্গে নিয়মিত যোগাযোগ রাখুন।','সন্তানকে সময় দিন, কথা শুনুন এবং ভালোবাসা দিয়ে বুঝতে চেষ্টা করুন।','প্রয়োজনের অতিরিক্ত টাকা না দিয়ে প্রয়োজনীয় অর্থ ও পানি দিন।','মাঝে মাঝে স্কুল ব্যাগ ও দৈনিক ক্লাসের খাতা পরীক্ষা করুন; অনুপযুক্ত ব্যবহারে সহায়তা করুন।','পড়াশোনার মান বা অন্য কোনো সমস্যা হলে শ্রেণি শিক্ষক/প্রতিষ্ঠান প্রধানের সঙ্গে যোগাযোগ করুন।','সততা, শৃঙ্খলা ও সুন্দর অভ্যাস গড়ে তুলতে উৎসাহ দিন।','সকালে সময়মতো ঘুম থেকে ওঠা, পড়াশোনা, খেলাধুলা ও ব্যায়ামের অভ্যাস করুন।','সন্ধ্যায় বাসার পড়া ও স্কুলের দেওয়া বাড়ির কাজ নিশ্চিত করুন।'],
    teachers:['সর্বদা শেখার চেষ্টা করুন—শেখার কোনো শেষ নেই।','শিক্ষার্থীদের ভালোভাবে বোঝানোর চেষ্টা করুন।','ভাষাজ্ঞান ও শুদ্ধ উচ্চারণ রপ্ত করুন।','সততা ও বিশ্বস্ততা অর্জন করুন।','সহনশীল চরিত্রের অধিকারী হন, সময়কে মূল্য দিন ও ধৈর্যশীল থাকুন।','শিক্ষার্থীর মন-মানসিকতা বোঝার চেষ্টা করুন।','আচার-আচরণে অনুকরণীয় হন ও সামাজিকতার গুণ অর্জন করুন।','প্রত্যেক শিক্ষার্থীকে নিজের সন্তানের মতো স্নেহের দৃষ্টিতে রাখুন।','আপনাকে অনুকরণ করেই শিক্ষার্থীরা ধাপে ধাপে আদর্শ মানুষ হয়ে উঠবে।'],
    students:['পিতা-মাতা, শিক্ষক-শিক্ষিকা ও গুরুজনকে সম্মান করা।','১০০% ক্লাসে উপস্থিত থাকা ও সকল পরীক্ষায় অংশগ্রহণ করা।','পরিচ্ছন্ন পোশাক পরিধান করা।','দৈনিক পাঠ বুঝে নেওয়া এবং দিনের আলো থাকতেই বাড়ির কাজ করা।','সন্ধ্যায় নামাজ আদায়ের পর পড়তে বসা।','নম্রতা, ভদ্রতা, শিষ্টাচার, শৃঙ্খলা, কৌতূহল ও সহানুভূতির চর্চা করা।','আত্মনির্ভরশীল, শ্রদ্ধাশীল ও প্রতিযোগিতামুখী হওয়া এবং স্কুলের নিয়ম মেনে চলা।']
  },
  en:{
    parents:['Make sure your child arrives at school on time.','Keep track of when your child returns home from school.','Ensure your child participates in every examination.','Check homework and exam notebooks regularly and provide needed support.','Stay in regular contact with the class teacher.','Give your child time, listen to them and guide them with love.','Provide only the money and water they need; avoid unnecessary cash.','Check the school bag and daily class notebooks from time to time and help with inappropriate use.','Contact the class teacher or head of the institution about academic or other concerns.','Encourage honesty, discipline and positive habits.','Build a habit of waking on time, studying, playing and exercising.','Ensure evening study at home and completion of school homework.'],
    teachers:['Keep learning—there is no end to learning.','Try to explain lessons clearly to students.','Develop strong language skills and correct pronunciation.','Build honesty and trustworthiness.','Be patient and respectful, value time and show a balanced character.','Try to understand students’ minds and feelings.','Be a positive role model and develop social skills.','Treat every student with the care you would give your own child.','Students will gradually grow into responsible people by following positive examples.'],
    students:['Respect parents, teachers and elders.','Maintain full class attendance and participate in all examinations.','Wear clean and tidy school uniform.','Understand daily lessons and complete homework during daylight when possible.','After evening prayer, sit down for study.','Practice humility, good manners, discipline, curiosity and empathy.','Be self-reliant, respectful and motivated to learn while following school rules.']
  }
};
function setNoticeLanguage(lang){
  const groups=['parents','teachers','students'];
  $$('.acc-body').forEach((body,i)=>{const list=body.querySelector('ol,ul'); if(!list)return; list.innerHTML=noticeLists[lang][groups[i]].map(x=>`<li>${x}</li>`).join('');});
}

const savedLang=localStorage.getItem('gks-language')||'bn';
$('#languageSelect')?.addEventListener('change',e=>setLang(e.target.value));
setLang(savedLang,false);

/* ---------- Smooth desktop 3D tilt: requestAnimationFrame, passive pointer events ---------- */
if(window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  $$('.tilt-card').forEach(card=>{
    let raf=0,lastX=0,lastY=0;
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      lastX=(e.clientX-r.left)/r.width-.5; lastY=(e.clientY-r.top)/r.height-.5;
      if(raf)return;
      raf=requestAnimationFrame(()=>{
        card.style.transform=`translate3d(0,0,0) rotateX(${lastY*-3.5}deg) rotateY(${lastX*4.5}deg)`;
        raf=0;
      });
    },{passive:true});
    card.addEventListener('pointerleave',()=>{if(raf)cancelAnimationFrame(raf);raf=0;card.style.transform=''});
  });
}
