python3 - << 'PY'
import json
tpl = open('spa_template.html', encoding='utf-8').read()
data = json.load(open('nexus_db.json', encoding='utf-8'))
open('index.html', 'w', encoding='utf-8').write(tpl.replace('__DATA__', json.dumps(data, ensure_ascii=False)))
print('OK index regenerado')
PY
