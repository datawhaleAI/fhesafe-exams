import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Trash2, RefreshCw } from 'lucide-react';

const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [encryptionDebug, setEncryptionDebug] = useState<any>(null);
  const [finalArgs, setFinalArgs] = useState<any>(null);

  const loadDebugInfo = () => {
    const fheDebug = localStorage.getItem('fhe-debug-info');
    const fheEncryption = localStorage.getItem('fhe-encryption-debug');
    const fheArgs = localStorage.getItem('fhe-final-args');

    if (fheDebug) {
      setDebugInfo(JSON.parse(fheDebug));
    }
    if (fheEncryption) {
      setEncryptionDebug(JSON.parse(fheEncryption));
    }
    if (fheArgs) {
      setFinalArgs(JSON.parse(fheArgs));
    }
  };

  const clearDebugInfo = () => {
    localStorage.removeItem('fhe-debug-info');
    localStorage.removeItem('fhe-encryption-debug');
    localStorage.removeItem('fhe-final-args');
    setDebugInfo(null);
    setEncryptionDebug(null);
    setFinalArgs(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    loadDebugInfo();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FHE调试信息</h1>
        <div className="flex gap-2">
          <Button onClick={loadDebugInfo} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
          <Button onClick={clearDebugInfo} variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            清除
          </Button>
        </div>
      </div>

      {/* FHE加密调试信息 */}
      {encryptionDebug && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">FHE加密调试</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(encryptionDebug.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            <div><strong>原始值:</strong> {encryptionDebug.value}</div>
            <div><strong>合约地址:</strong> {encryptionDebug.contractAddress}</div>
            <div><strong>用户地址:</strong> {encryptionDebug.userAddress}</div>
            <div><strong>加密结果:</strong></div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
              {JSON.stringify(encryptionDebug.encrypted, null, 2)}
            </pre>
            <div><strong>handles长度:</strong> {encryptionDebug.handlesLength}</div>
            <div><strong>proof长度:</strong> {encryptionDebug.proofLength}</div>
          </div>
        </Card>
      )}

      {/* 最终参数调试信息 */}
      {debugInfo && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">最终参数调试</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(debugInfo.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            <div><strong>考试ID:</strong> {debugInfo.examId}</div>
            <div><strong>原始分数:</strong> {debugInfo.score}</div>
            <div><strong>原始用时:</strong> {debugInfo.timeSpent}</div>
            <div><strong>加密分数:</strong> {debugInfo.encryptedScore}</div>
            <div><strong>加密用时:</strong> {debugInfo.encryptedTime}</div>
            <div><strong>证明:</strong> {debugInfo.proof}</div>
            <div><strong>合约地址:</strong> {debugInfo.contractAddress}</div>
            <div><strong>用户地址:</strong> {debugInfo.userAddress}</div>
          </div>
        </Card>
      )}

      {/* 最终参数数组 */}
      {finalArgs && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">最终参数数组</Badge>
            <Button 
              onClick={() => copyToClipboard(JSON.stringify(finalArgs, null, 2))}
              variant="outline" 
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              复制
            </Button>
          </div>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {JSON.stringify(finalArgs, null, 2)}
          </pre>
        </Card>
      )}

      {!debugInfo && !encryptionDebug && !finalArgs && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">暂无调试信息</p>
          <p className="text-sm text-muted-foreground mt-2">
            请先提交一次考试，然后刷新此页面查看调试信息
          </p>
        </Card>
      )}
    </div>
  );
};

export default DebugInfo;
