import itertools

options = {
    'S1': ['도심형(0점)', '외곽/농어촌(1점)'],
    'S2': ['단독저층', '3층이상/복합'],
    'S3': ['수평대피공간 보유', '수평대피공간 없음'],
    'S4': ['경증위주(50%미만)', '중증위주(50%이상)'],
    'S5': ['야간 2인이상(0점)', '야간 단독근무(2점, 초고위험)'],
    'S6': ['모의훈련 양호(0점)', '훈련 미흡(1점)'],
    'S7': ['차량지원 양호(0점)', '지원 불가(1점)']
}

html = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>128가지 요양원 대피체계 경우의 수 매핑 표</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; background-color: #f8f9fa; padding: 20px; color: #333; }
    h1 { text-align: center; color: #2c3e50; font-size: 24px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
    th, td { border: 1px solid #dee2e6; padding: 12px 10px; text-align: center; font-size: 13px; }
    th { background-color: #343a40; color: white; position: sticky; top: 0; font-size: 14px; }
    tr:nth-child(even) { background-color: #f8f9fa; }
    tr:hover { background-color: #e2e6ea; }
    .score { font-weight: bold; color: #495057; }
    .type-1 { color: #28a745; font-weight: bold; }
    .type-2 { color: #17a2b8; font-weight: bold; }
    .type-3 { color: #ffc107; font-weight: bold; text-shadow: 0 0 1px #000; }
    .type-4 { color: #fd7e14; font-weight: bold; }
    .type-5 { color: #20c997; font-weight: bold; }
    .type-6 { color: #007bff; font-weight: bold; }
    .type-7 { color: #e83e8c; font-weight: bold; }
    .type-8 { color: #dc3545; font-weight: bold; }
    .axis { color: #6c757d; font-size: 12px; }
</style>
</head>
<body>
    <h1>🏥 요양병원시설 대피체계 128가지 경우의 수 매핑 결과</h1>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Step 1 (입지)</th>
                <th>Step 2 (건물)</th>
                <th>Step 3 (설비)</th>
                <th>Step 4 (환자)</th>
                <th>Step 5 (야간인력)</th>
                <th>Step 6 (훈련)</th>
                <th>Step 7 (차량)</th>
                <th>고립 점수</th>
                <th>3축 매핑결과</th>
                <th>최종 도출 유형</th>
            </tr>
        </thead>
        <tbody>"""

for idx, combo in enumerate(itertools.product(*options.values())):
    s1, s2, s3, s4, s5, s6, s7 = combo
    
    if s2 == '단독저층' or s3 == '수평대피공간 보유':
        axis1 = '수평대피'
    else:
        axis1 = '수직대피'
        
    if s4 == '경증위주(50%미만)':
        axis2 = '경증'
    else:
        axis2 = '중증'
        
    score = 0
    if '1점' in s1: score += 1
    if '2점' in s5: score += 2
    if '1점' in s6: score += 1
    if '1점' in s7: score += 1
    
    if score >= 3 or '2점' in s5:
        axis3 = '야간고립'
    else:
        axis3 = '자원양호'
        
    type_map = {
        ('수평대피', '경증', '자원양호'): ('유형 1: 최상위 안전형', 'type-1'),
        ('수평대피', '경증', '야간고립'): ('유형 2: 초기 대응 주의형', 'type-2'),
        ('수평대피', '중증', '자원양호'): ('유형 3: 이송 자원 집중형', 'type-3'),
        ('수평대피', '중증', '야간고립'): ('유형 4: 방어적 생존형', 'type-4'),
        ('수직대피', '경증', '자원양호'): ('유형 5: 계단 병목형', 'type-5'),
        ('수직대피', '경증', '야간고립'): ('유형 6: 수직 탈출 지연형', 'type-6'),
        ('수직대피', '중증', '자원양호'): ('유형 7: 수직 이송 난관형', 'type-7'),
        ('수직대피', '중증', '야간고립'): ('유형 8: 최고위험 총체적 난국형', 'type-8')
    }
    
    arch, color_class = type_map[(axis1, axis2, axis3)]
    axis_str = f'[{axis1}/{axis2}/{axis3}]'
    
    html += f'<tr><td>{idx+1}</td><td>{s1}</td><td>{s2}</td><td>{s3}</td><td>{s4}</td><td>{s5}</td><td>{s6}</td><td>{s7}</td><td class="score">{score}점</td><td class="axis">{axis_str}</td><td class="{color_class}">{arch}</td></tr>'

html += """
        </tbody>
    </table>
</body>
</html>
"""

with open('d:/2026년/요양병원시설 대피체계/128가지_경우의수_매핑표.html', 'w', encoding='utf-8') as f:
    f.write(html)
