/**
 * Simple component loader for vanilla JS modularity.
 * Fetches HTML content and injects it into elements with data-include attribute.
 */
export async function loadComponents() {
    const elements = document.querySelectorAll('[data-include]');
    
    for (const element of elements) {
        const file = element.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Could not load ${file}`);
            const content = await response.text();
            element.innerHTML = content;
            
            // Execute scripts in the injected content
            const scripts = element.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Dispatch event to notify that component is loaded
            const event = new CustomEvent('componentLoaded', { detail: { file } });
            document.dispatchEvent(event);

        } catch (error) {
            console.error(`Error loading component ${file}:`, error);
            element.innerHTML = `<div style="color:red">Error loading ${file}</div>`;
        }
    }
}

// Auto-load on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadComponents);
