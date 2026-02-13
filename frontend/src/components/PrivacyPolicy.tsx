import React from 'react';
import { Shield, Lock, Eye, Database, FileText, Bell, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SEO from './SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
      <SEO title="Privacy Policy — IMI.GE" description="Learn how IMI.GE collects, uses, and protects your personal data." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-8 border border-primary/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide">
            კონფიდენციალურობის პოლიტიკა
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 tracking-wide font-sans">
            ბოლო განახლება: 2024 წლის 12 თებერვალი
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-white/5 rounded-[2rem] p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl mb-12">
          <p className="leading-loose text-gray-700 dark:text-gray-300 tracking-wide font-light text-lg">
            AI Solutions Georgia (შემდგომში "ჩვენ") პატივს სცემს თქვენს კონფიდენციალურობას და ვალდებულებას იღებს დაიცვას თქვენი პერსონალური მონაცემები.
            წინამდებარე პოლიტიკა განმარტავს, თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს ინფორმაციას ჩვენი ვებ-გვერდის (<span className="text-primary font-bold">imi.ge</span>) და სერვისების გამოყენებისას.
          </p>
        </div>

        <div className="space-y-12">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              1. ინფორმაციის შეგროვება
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 mb-6 font-light">
                ჩვენ ვაგროვებთ შემდეგი ტიპის ინფორმაციას:
              </p>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-light">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0"></span>
                  <span><strong>პირადი საიდენტიფიკაციო ინფორმაცია:</strong> სახელი, ელ.ფოსტა, ტელეფონის ნომერი (მხოლოდ მაშინ, როცა თქვენ ნებაყოფლობით გვაწვდით საკონტაქტო ფორმის ან რეგისტრაციის გზით).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0"></span>
                  <span><strong>ტექნიკური მონაცემები:</strong> IP მისამართი, ბრაუზერის ტიპი, მოწყობილობის ტიპი, ოპერაციული სისტემა და ვებ-გვერდზე გატარებული დრო (Google Analytics-ის მეშვეობით).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0"></span>
                  <span><strong>ქუქი-ფაილების (Cookies) მონაცემები:</strong> ინფორმაცია თქვენი პრეფერენციების შესახებ ვებ-გვერდის ფუნქციონირების გასაუმჯობესებლად.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
              2. ინფორმაციის გამოყენება
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 font-light">
                შეგროვებულ ინფორმაციას ვიყენებთ შემდეგი მიზნებისთვის:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">მომსახურების გაწევა</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">თქვენი მოთხოვნების დამუშავება და უკუკავშირი.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">სერვისის გაუმჯობესება</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ვებ-გვერდის ფუნქციონალის და მომხმარებლის გამოცდილების ანალიზი.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">მარკეტინგი</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">სიახლეების და შეთავაზებების მოწოდება (მხოლოდ თქვენი თანხმობის შემთხვევაში).</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">უსაფრთხოება</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">თაღლითობის პრევენცია და სისტემის დაცვა.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Lock className="w-6 h-6 text-green-500" />
              </div>
              3. მონაცემთა უსაფრთხოება
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 font-light">
                ჩვენ ვიღებთ შესაბამის ტექნიკურ და ორგანიზაციულ ზომებს თქვენი პერსონალური მონაცემების დასაცავად არაავტორიზებული წვდომისგან,
                გამჟღავნებისგან, შეცვლისგან ან განადგურებისგან. ჩვენ ვიყენებთ SSL/TLS შიფრაციას მონაცემთა გადაცემისას.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Globe className="w-6 h-6 text-orange-500" />
              </div>
              4. მესამე მხარეები
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5">
              <p className="leading-loose text-gray-700 dark:text-gray-300 font-light">
                ჩვენ არ ვყიდით და არ ვაქირავებთ თქვენს პერსონალურ მონაცემებს. ინფორმაციის გაზიარება ხდება მხოლოდ:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 dark:text-gray-300 font-light">
                <li>ჩვენს პარტნიორ სერვის პროვაიდერებთან (მაგ. ჰოსტინგი, ანალიტიკა), რომლებიც ვალდებულნი არიან დაიცვან კონფიდენციალურობა.</li>
                <li>კანონმდებლობით გათვალისწინებულ შემთხვევებში, სამართალდამცავი ორგანოების მოთხოვნის საფუძველზე.</li>
              </ul>
            </div>
          </section>

          {/* Footer Contact */}
          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">გაქვთ კითხვები?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              დაგვიკავშირდით მონაცემთა დაცვის საკითხებზე:
            </p>
            <a href="mailto:hello@imi.ge" className="text-primary font-bold hover:text-secondary transition-colors text-lg">
              hello@imi.ge
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
