import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useConversion } from '../hooks/useConversion';
import { useAuth } from '../contexts/AuthContext';
import { isMultiPageConversion } from '../data/conversions';
import Button from './ui/Button';
import Card from './ui/Card';
import AuthBenefits from './ui/AuthBenefits';

const ConversionResults = ({ onNewConversion, onNavigate }) => {
  const { state } = useApp();
  const { user } = useAuth();
  const { downloadResult, downloadAll, resetConversion, resetConversionKeepCategory } = useConversion();

  const handleNewConversion = () => {
    resetConversion();
    if (onNewConversion) {
      onNewConversion();
    }
  };

  const handleAnotherConversion = () => {
    resetConversionKeepCategory();
  };
  
  if (state.conversionResults.length === 0) return null;

  const successfulResults = state.conversionResults.filter(r => r.success);
  const failedResults = state.conversionResults.filter(r => !r.success);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Conversion Results
          </h2>
          <div className="flex space-x-3">
            {successfulResults.length > 1 && (
              <Button onClick={downloadAll} size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download All
              </Button>
            )}
            <Button variant="secondary" onClick={handleAnotherConversion} size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Another Conversion
            </Button>
            <Button variant="secondary" onClick={handleNewConversion} size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              New Conversion
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              {successfulResults.length} Successful
            </span>
          </div>
          {failedResults.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400">
                {failedResults.length} Failed
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {state.conversionResults.map((result, index) => (
          <ResultItem 
            key={`result-${index}`}
            result={result}
            onDownload={() => downloadResult(result)}
          />
        ))}
      </div>

      {failedResults.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                Some files failed to convert
              </h4>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                This might be due to file corruption, unsupported features, or file size limitations. 
                You can try converting them individually or check the file format.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auth Benefits - Show after successful conversion to encourage sign up */}
      {successfulResults.length > 0 && (
        <div className="mt-6">
          <AuthBenefits 
            onSignInClick={() => {
              if (onNavigate) {
                onNavigate('auth');
              }
            }}
          />
        </div>
      )}
    </Card>
  );
};

const ResultItem = ({ result, onDownload }) => {
  const { state } = useApp();
  const { originalFile, convertedFileName, size, success, error } = result;
  
  // Handle cases where originalFile might be undefined
  const originalFileName = originalFile?.name || 'Unknown file';
  const originalFileSize = originalFile?.size || 0;
  
  // Check if this is a PDF to image conversion (results in ZIP)
  const isZipResult = isMultiPageConversion(state.sourceFormat, state.targetFormat) && 
                     convertedFileName?.endsWith('.zip');
  
  return (
    <div className={`flex items-center space-x-4 p-4 rounded-xl border ${
      success 
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    }`}>
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {success ? (
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {originalFileName}
          </p>
          <span className="text-gray-400">→</span>
          <div className="flex items-center space-x-2">
            <p className={`text-sm font-medium truncate ${
              success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {success ? convertedFileName : 'Failed'}
            </p>
            {isZipResult && success && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                📦 Multi-page
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span>Original: {formatFileSize(originalFileSize)}</span>
          {success && size && (
            <>
              <span>•</span>
              <span>
                {isZipResult ? 'ZIP Archive: ' : 'Converted: '}
                {formatFileSize(size)}
              </span>
              {originalFileSize > 0 && !isZipResult && (
                <>
                  <span>•</span>
                  <span className={`font-medium ${
                    size < originalFileSize ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {size < originalFileSize ? 'Smaller' : 'Larger'} ({Math.round(((size - originalFileSize) / originalFileSize) * 100)}%)
                  </span>
                </>
              )}
              {isZipResult && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Contains {state.targetFormat} images for each page
                  </span>
                </>
              )}
            </>
          )}
          {!success && error && (
            <>
              <span>•</span>
              <span className="text-red-600 dark:text-red-400">{error}</span>
            </>
          )}
        </div>
      </div>

      {/* Download Button */}
      {success && (
        <div className="flex-shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDownload}
            className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default ConversionResults;
