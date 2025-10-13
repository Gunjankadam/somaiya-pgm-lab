import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">K J Somaiya Institute of Technology</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              An Autonomous Institute permanently affiliated to the University of Mumbai,
              approved by AICTE and Government of Maharashtra.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="opacity-90">
                  Ayurvihar Complex, Eastern Express Highway,<br />
                  Sion, Mumbai - 400022, India
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p className="opacity-90">+91-22-44444408 / 44444403</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <p className="opacity-90">info.tech@somaiya.edu</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://kjsit.somaiya.edu.in/" className="opacity-90 hover:opacity-100 transition-opacity">
                  University Website
                </a>
              </li>
              <li>
                <a href="https://kjsit.somaiya.edu.in/en/programme/computer-engineering" className="opacity-90 hover:opacity-100 transition-opacity">
                  Department Portal
                </a>
              </li>
              <li>
                <a href="https://www.kjsieit.in/sims/student/login.php" className="opacity-90 hover:opacity-100 transition-opacity">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="https://www.kjsieit.in/sims/faculty/login.php" className="opacity-90 hover:opacity-100 transition-opacity">
                  Faculty Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} K J Somaiya Institute of Technology. All rights reserved.</p>
          
          <div className="px-4 mt-4 space-y-2">
            <p>
              Created by{" "}
              <a 
                href="https://www.linkedin.com/in/kasam-mapara-016637256/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline transition-colors"
              >
                Kasam Mapara
              </a>
              {" "}and{" "}
              <a 
                href="https://www.linkedin.com/in/gunjan-kadam-2902b12b9/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline transition-colors"
              >
                Gunjan Kadam
              </a>
            </p>
            
            <p className="  px-4 py-2 rounded-lg  ">
              <span className="font-semibold">Guided by:</span> Prof. Pradyna Patil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
