import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Lock, 
  Brain, 
  Award, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Zap
} from "lucide-react";
import heroImage from "@/assets/exam-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6">
        <div className="absolute inset-0 bg-white/5 opacity-20"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="w-12 h-12 animate-pulse" />
              <Lock className="w-8 h-8 animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              FHESafe Exams
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              革命性的考试平台，使用全同态加密技术确保答案在提交截止日期前保持机密
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/platform">进入考试平台</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/learn">了解FHE技术</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择FHESafe Exams？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们采用最先进的全同态加密技术，为教育机构提供真正安全的在线考试解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">完全隐私保护</h3>
              <p className="text-gray-600">
                答案在提交前完全加密，连系统管理员也无法查看，确保考试公平性
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">智能防作弊</h3>
              <p className="text-gray-600">
                基于区块链的身份验证和加密技术，有效防止代考和作弊行为
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">可信证书</h3>
              <p className="text-gray-600">
                基于区块链的不可篡改证书，确保学历和成绩的真实性
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                全同态加密技术
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                全同态加密（FHE）允许在不解密数据的情况下进行计算，这意味着：
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">答案在提交前完全加密</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">系统可以处理加密数据</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">只有授权人员才能解密</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">确保考试过程的绝对公平</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">技术优势</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">零知识证明</div>
                      <div className="opacity-80">保护隐私</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">区块链验证</div>
                      <div className="opacity-80">不可篡改</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">智能合约</div>
                      <div className="opacity-80">自动执行</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">去中心化</div>
                      <div className="opacity-80">高度安全</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            准备开始您的安全考试之旅？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            加入我们，体验下一代加密考试技术
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              <Link to="/platform" className="flex items-center gap-2">
                立即开始 <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <Link to="/learn" className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                了解更多
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
