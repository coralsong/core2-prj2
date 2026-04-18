document.addEventListener('DOMContentLoaded', () => {
    const stringHitbox = document.getElementById('stringHitbox');
    const container = document.getElementById('stringContainer');
    const state1 = document.getElementById('state1');
    const state2 = document.getElementById('state2');
    const state3 = document.getElementById('state3');
    
    let isDragging = false;
    let startY = 0;
    let currentState = "1";

    function updateVisuals() {
        state1.classList.remove('active');
        state2.classList.remove('active');
        state3.classList.remove('active');
        
        if (currentState === "1") state1.classList.add('active');
        if (currentState === "2") state2.classList.add('active');
        if (currentState === "3") state3.classList.add('active');
    }

    stringHitbox.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startY = e.clientY;
        stringHitbox.setPointerCapture(e.pointerId);
        container.style.transition = 'none';
    });

    stringHitbox.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        
        if (currentState === "1" && deltaY > 15) {
            currentState = "2";
            updateVisuals();
        }
        
        if (deltaY > 0 && deltaY < 40 && currentState !== "3") {
            container.style.transform = `translateY(${deltaY * 0.4}px)`;
        }
    });

    stringHitbox.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        stringHitbox.releasePointerCapture(e.pointerId);
        
        const deltaY = e.clientY - startY;

        container.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        container.style.transform = `translateY(0px)`;

        if (Math.abs(deltaY) < 10) {
            if (currentState === "2") {
                triggerSpring();
            }
        } else {
            if (deltaY < -15 && currentState === "2") {
                currentState = "1";
                updateVisuals();
            }
        }
    });

    function triggerSpring() {
        currentState = "3";
        updateVisuals();
        
        container.style.transition = 'none';
        container.style.transform = 'scaleY(0.8) translateY(-10px)';
        
        void container.offsetHeight;
        
        container.style.transition = 'transform 0.4s cubic-bezier(0.3, 2.5, 0.5, 1)';
        container.style.transform = 'scaleY(1) translateY(0px)';
        
        setTimeout(() => {
            currentState = "1";
            updateVisuals();
            
            container.style.transition = 'none';
            container.style.transform = 'scaleY(1.4) translateY(30px)';
            
            void container.offsetHeight;
            
            container.style.transition = 'transform 1s cubic-bezier(0.34, 2.5, 0.4, 0.9)';
            container.style.transform = 'scaleY(1) translateY(0px)';
        }, 380); 
    }
});

const toggle = document.getElementById('slider2');
const sunImg = document.getElementById('sunImg');
const moonImg = document.getElementById('moonImg');

toggle.addEventListener('click', () => {
sunImg.classList.toggle('active');
moonImg.classList.toggle('active');
});