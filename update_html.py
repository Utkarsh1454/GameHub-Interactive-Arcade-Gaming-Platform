import os

html_dir = './html'
index_path = './index.html'

def patch_file(filepath, css_path, js_path):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    modified = False
    
    if css_path not in content:
        if '</head>' in content:
            content = content.replace('</head>', f'    <link rel="stylesheet" href="{css_path}">\n</head>')
            modified = True
            
    if js_path not in content:
        if '</body>' in content:
            audio_path = js_path.replace('global.js', 'audio.js')
            content = content.replace('</body>', f'    <script src="{audio_path}"></script>\n    <script src="{js_path}"></script>\n</body>')
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f: f.write(content)

if os.path.exists(index_path):
    patch_file(index_path, 'css/global.css', 'js/global.js')

if os.path.exists(html_dir):
    for filename in os.listdir(html_dir):
        if filename.endswith('.html'):
            patch_file(os.path.join(html_dir, filename), '../css/global.css', '../js/global.js')
