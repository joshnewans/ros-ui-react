export function applyDeadzone(val, deadzone) {

    if (val > deadzone)
    {
        val -= deadzone;
    }
    else if (val < -deadzone)
    {
        val += deadzone;
    }
    else 
    {
        val = 0;
    }
    return -val/(1.0 - deadzone);

}