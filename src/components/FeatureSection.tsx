import { Card } from "@/components/ui/card";
import { Shield, Lock, Clock, Users, Key, CheckCircle } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Fully Homomorphic Encryption",
      description: "Answers remain encrypted during the entire exam process, ensuring absolute privacy until deadline.",
      color: "text-exam-locked"
    },
    {
      icon: Lock,
      title: "Academic Integrity",
      description: "Blockchain-verified identity prevents cheating and ensures each student's authentic participation.",
      color: "text-exam-encrypted"
    },
    {
      icon: Clock,
      title: "Deadline Protection",
      description: "Encrypted answers are only decryptable after submission deadline, eliminating early access concerns.",
      color: "text-exam-warning"
    },
    {
      icon: Users,
      title: "Secure Collaboration",
      description: "Group exams with individual encrypted contributions that maintain privacy until review.",
      color: "text-primary"
    },
    {
      icon: Key,
      title: "Cryptographic Proofs",
      description: "Mathematical verification of answer integrity without revealing content before deadline.",
      color: "text-exam-locked"
    },
    {
      icon: CheckCircle,
      title: "Tamper Evidence",
      description: "Immutable blockchain records provide complete audit trail of all exam activities.",
      color: "text-exam-encrypted"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Revolutionary Exam Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of academic testing with cryptographically secure, 
            privacy-preserving examination technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 bg-white/80 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 mb-4 group-hover:animate-bounce`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;