import React from 'react';
import { results } from '../data/results';
import { questions } from '../data/questions';
import { RefreshCcw, BookOpen, Users, ShieldAlert, CheckCircle } from 'lucide-react';

export default function ResultReport({ selections, onReset }) {
  // Mapping logic: 7 steps to 3 axes
  // Axis 1: horizontal vs vertical
  let isHorizontal = false;
  // Axis 2: mild vs severe
  let isSevere = false;
  // Axis 3: good_resource vs isolated
  let isolationScore = 0;
  let isSoloNight = false;

  selections.forEach((optionId, index) => {
    const question = questions[index];
    const option = question.options.find(opt => opt.id === optionId);
    if (!option) return;

    // Axis 1 Logic (Step 2 and Step 3)
    if (option.meta && option.meta.isHorizontalFriendly) {
      isHorizontal = true;
    }
    // If Step 3 explicitly says no horizontal space, it overrides Step 2's low building status? 
    // Usually if Step 3 is horiz_no, and it's bld_high -> vertical.
    // If it's bld_low but horiz_no -> still might be horizontal because they can go straight out.
    // We'll trust the latest `meta.isHorizontalFriendly` or a combined check.
    if (optionId === "horiz_no" && selections.includes("bld_high")) {
        isHorizontal = false;
    }

    // Axis 2 Logic (Step 4)
    if (option.meta && option.meta.severity) {
      isSevere = option.meta.severity === "severe";
    }

    // Axis 3 Logic (Step 1, 5, 6, 7)
    if (typeof option.score === 'number') {
      isolationScore += option.score;
    }
    if (optionId === "night_solo") {
      isSoloNight = true;
    }
  });

  const axis1 = isHorizontal ? "horizontal" : "vertical";
  const axis2 = isSevere ? "severe" : "mild";
  // If score >= 3 OR solo night shift -> isolated
  const axis3 = (isolationScore >= 3 || isSoloNight) ? "isolated" : "good_resource";

  const resultKey = `${axis1}_${axis2}_${axis3}`;
  const result = results[resultKey];

  if (!result) {
    return (
      <div className="glass-card error-card">
        <h2>결과를 찾을 수 없습니다.</h2>
        <p>내부 계산 중 오류가 발생했습니다. (Key: {resultKey})</p>
        <button className="primary-button" onClick={onReset}>다시 시작하기</button>
      </div>
    );
  }

  return (
    <div className="result-report fade-in">
      <div className="glass-card hero-result-card">
        <div className="result-header">
          <div className="result-icon-wrapper">
            <CheckCircle className="result-hero-icon" />
          </div>
          <h1 className="result-title">{result.title}</h1>
        </div>
        
        <p className="result-description">{result.description}</p>
        
        <div className="tags-container">
          {result.tags.map(tag => (
            <span key={tag} className="result-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="glass-card manual-card">
        <h2 className="manual-section-title">직무별 행동 매뉴얼</h2>
        
        <div className="manual-item">
          <div className="manual-item-header">
            <ShieldAlert className="manual-icon" />
            <h3>관리자 (원장 등)</h3>
          </div>
          <p className="manual-text">{result.manual.manager}</p>
        </div>

        <div className="manual-item">
          <div className="manual-item-header">
            <Users className="manual-icon" />
            <h3>종사원 (간호, 요양보호사)</h3>
          </div>
          <p className="manual-text">{result.manual.staff}</p>
        </div>

        <div className="manual-item">
          <div className="manual-item-header">
            <BookOpen className="manual-icon" />
            <h3>소방안전관리자</h3>
          </div>
          <p className="manual-text">{result.manual.fire_safety}</p>
        </div>
      </div>

      <div className="result-actions">
        <button className="secondary-button" onClick={onReset}>
          <RefreshCcw className="button-icon" />
          처음부터 다시 진단하기
        </button>
      </div>
    </div>
  );
}
